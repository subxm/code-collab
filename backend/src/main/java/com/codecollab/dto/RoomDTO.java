package com.codecollab.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    private String id;
    private String name;
    private String roomCode;
    private String defaultLang;
    private Boolean isPublic;
    private Integer maxMembers;
    private String ownerId;
    private String ownerName;
    private Integer memberCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<MemberDTO> members;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MemberDTO {
        private String userId;
        private String displayName;
        private String email;
        private String avatarUrl;
        private String role;
        private LocalDateTime joinedAt;
    }
}
