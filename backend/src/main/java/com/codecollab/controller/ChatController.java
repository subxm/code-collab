package com.codecollab.controller;

import com.codecollab.dto.ChatMessageDTO;
import com.codecollab.entity.User;
import com.codecollab.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms/{roomId}/messages")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping
    public ResponseEntity<List<ChatMessageDTO>> getChatHistory(
            @PathVariable Long roomId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(chatService.getChatHistory(roomId, user, page, size));
    }
}
