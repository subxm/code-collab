package com.codecollab.controller;

import com.codecollab.dto.*;
import com.codecollab.entity.User;
import com.codecollab.repository.UserRepository;
import com.codecollab.service.ChatService;
import com.codecollab.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@Slf4j
public class CollabController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;
    private final FileService fileService;
    private final UserRepository userRepository;

    // Track active users per room: roomId -> Set of active user data
    private final Map<Long, Set<UserPresenceMessage.ActiveUserDTO>> activeRoomUsers = new ConcurrentHashMap<>();

    // Color palette for user cursors
    private static final String[] CURSOR_COLORS = {
            "#6366f1", "#ec4899", "#14b8a6", "#f59e0b",
            "#8b5cf6", "#ef4444", "#10b981", "#3b82f6",
            "#f97316", "#06b6d4", "#84cc16", "#e879f9"
    };

    /**
     * Handle code changes — broadcast to all users in the room
     * Frontend sends to: /app/room/{roomId}/code
     * Subscribers receive at: /topic/room/{roomId}/code
     */
    @MessageMapping("/room/{roomId}/code")
    @SendTo("/topic/room/{roomId}/code")
    public CodeChangeMessage handleCodeChange(
            @DestinationVariable Long roomId,
            @Payload CodeChangeMessage message) {
        message.setType("CODE_CHANGE");
        message.setTimestamp(LocalDateTime.now().toString());
        log.info("Code change in room {} by user {}", roomId, message.getUsername());

        // Persist the file content update asynchronously
        if (message.getFileId() != null && message.getContent() != null) {
            try {
                User user = userRepository.findById(message.getUserId()).orElse(null);
                if (user != null) {
                    UpdateFileRequest updateRequest = new UpdateFileRequest();
                    updateRequest.setContent(message.getContent());
                    fileService.updateFile(roomId, message.getFileId(), updateRequest, user);
                }
            } catch (Exception e) {
                log.warn("Failed to persist code change: {}", e.getMessage());
            }
        }

        return message;
    }

    /**
     * Handle cursor updates — broadcast to all users in the room
     * Frontend sends to: /app/room/{roomId}/cursor
     * Subscribers receive at: /topic/room/{roomId}/cursors
     */
    @MessageMapping("/room/{roomId}/cursor")
    @SendTo("/topic/room/{roomId}/cursors")
    public CursorPositionMessage handleCursorUpdate(
            @DestinationVariable Long roomId,
            @Payload CursorPositionMessage message) {
        message.setType("CURSOR_UPDATE");
        return message;
    }

    /**
     * Handle chat messages — persist + broadcast to all users in the room
     * Frontend sends to: /app/room/{roomId}/chat
     * Subscribers receive at: /topic/room/{roomId}/chat
     */
    @MessageMapping("/room/{roomId}/chat")
    public void handleChatMessage(
            @DestinationVariable Long roomId,
            @Payload ChatMessageDTO message) {
        try {
            User user = userRepository.findById(message.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Persist the message
            ChatMessageDTO saved = chatService.saveMessage(roomId, user, message.getContent());

            // Broadcast to subscribers
            messagingTemplate.convertAndSend("/topic/room/" + roomId + "/chat", saved);
        } catch (Exception e) {
            log.error("Error handling chat message: {}", e.getMessage());
        }
    }

    /**
     * Handle user joining a room
     * Frontend sends to: /app/room/{roomId}/join
     * Subscribers receive at: /topic/room/{roomId}/users
     */
    @MessageMapping("/room/{roomId}/join")
    public void handleUserJoin(
            @DestinationVariable Long roomId,
            @Payload Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        String username = (String) payload.get("username");
        String avatarUrl = (String) payload.getOrDefault("avatarUrl", null);

        Set<UserPresenceMessage.ActiveUserDTO> users = activeRoomUsers
                .computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet());

        // Assign a color
        String color = CURSOR_COLORS[(int) (userId % CURSOR_COLORS.length)];

        UserPresenceMessage.ActiveUserDTO activeUser = UserPresenceMessage.ActiveUserDTO.builder()
                .userId(userId)
                .username(username)
                .avatarUrl(avatarUrl)
                .color(color)
                .build();

        users.add(activeUser);

        UserPresenceMessage presenceMessage = UserPresenceMessage.builder()
                .type("USER_JOINED")
                .userId(userId)
                .username(username)
                .avatarUrl(avatarUrl)
                .activeUsers(new ArrayList<>(users))
                .build();

        messagingTemplate.convertAndSend("/topic/room/" + roomId + "/users", presenceMessage);
        log.info("User {} joined room {}, active users: {}", username, roomId, users.size());
    }

    /**
     * Handle user leaving a room
     * Frontend sends to: /app/room/{roomId}/leave
     * Subscribers receive at: /topic/room/{roomId}/users
     */
    @MessageMapping("/room/{roomId}/leave")
    public void handleUserLeave(
            @DestinationVariable Long roomId,
            @Payload Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        String username = (String) payload.get("username");

        Set<UserPresenceMessage.ActiveUserDTO> users = activeRoomUsers.get(roomId);
        if (users != null) {
            users.removeIf(u -> u.getUserId().equals(userId));
            if (users.isEmpty()) {
                activeRoomUsers.remove(roomId);
            }
        }

        UserPresenceMessage presenceMessage = UserPresenceMessage.builder()
                .type("USER_LEFT")
                .userId(userId)
                .username(username)
                .activeUsers(users != null ? new ArrayList<>(users) : Collections.emptyList())
                .build();

        messagingTemplate.convertAndSend("/topic/room/" + roomId + "/users", presenceMessage);
        log.info("User {} left room {}", username, roomId);
    }
}
