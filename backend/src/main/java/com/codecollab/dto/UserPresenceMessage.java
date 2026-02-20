package com.codecollab.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPresenceMessage {
    private String type; // "USER_JOINED" or "USER_LEFT"
    private Long userId;
    private String username;
    private String avatarUrl;
    private List<ActiveUserDTO> activeUsers;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ActiveUserDTO {
        private Long userId;
        private String username;
        private String avatarUrl;
        private String color;
    }
}
