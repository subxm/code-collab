package com.codecollab.dto;

import com.codecollab.entity.Room;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class RoomResponse {
    private Long id;
    private String name;
    private String roomCode;
    private String language;
    private Boolean isActive;
    private OwnerDTO owner;
    private int memberCount;
    private LocalDateTime createdAt;

    @Data
    @Builder
    public static class OwnerDTO {
        private Long id;
        private String username;
        private String avatarUrl;
    }

    public static RoomResponse from(Room room, int memberCount) {
        return RoomResponse.builder()
                .id(room.getId())
                .name(room.getName())
                .roomCode(room.getRoomCode())
                .language(room.getLanguage())
                .isActive(room.getIsActive())
                .owner(OwnerDTO.builder()
                        .id(room.getOwner().getId())
                        .username(room.getOwner().getUsername())
                        .avatarUrl(room.getOwner().getAvatarUrl())
                        .build())
                .memberCount(memberCount)
                .createdAt(room.getCreatedAt())
                .build();
    }
}
