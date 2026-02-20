package com.codecollab.dto;

import com.codecollab.entity.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDTO {
    private Long id;
    private Long roomId;
    private Long userId;
    private String username;
    private String avatarUrl;
    private String content;
    private LocalDateTime timestamp;

    public static ChatMessageDTO from(ChatMessage msg) {
        return ChatMessageDTO.builder()
                .id(msg.getId())
                .roomId(msg.getRoom().getId())
                .userId(msg.getUser().getId())
                .username(msg.getUser().getUsername())
                .avatarUrl(msg.getUser().getAvatarUrl())
                .content(msg.getContent())
                .timestamp(msg.getCreatedAt())
                .build();
    }
}
