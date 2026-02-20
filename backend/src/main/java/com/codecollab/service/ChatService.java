package com.codecollab.service;

import com.codecollab.dto.ChatMessageDTO;
import com.codecollab.entity.*;
import com.codecollab.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;

    public List<ChatMessageDTO> getChatHistory(Long roomId, User user, int page, int size) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!roomMemberRepository.existsByRoomAndUser(room, user)) {
            throw new RuntimeException("You are not a member of this room");
        }

        Page<ChatMessage> messages = chatMessageRepository.findByRoomOrderByCreatedAtDesc(
                room, PageRequest.of(page, size));

        return messages.getContent().stream()
                .map(ChatMessageDTO::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public ChatMessageDTO saveMessage(Long roomId, User user, String content) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        ChatMessage message = ChatMessage.builder()
                .room(room)
                .user(user)
                .content(content)
                .build();

        message = chatMessageRepository.save(message);
        return ChatMessageDTO.from(message);
    }
}
