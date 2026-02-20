package com.codecollab.dto;

import com.codecollab.entity.RoomMember;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MemberResponse {
    private Long id;
    private Long userId;
    private String username;
    private String avatarUrl;
    private String role;
    private LocalDateTime joinedAt;

    public static MemberResponse from(RoomMember member) {
        return MemberResponse.builder()
                .id(member.getId())
                .userId(member.getUser().getId())
                .username(member.getUser().getUsername())
                .avatarUrl(member.getUser().getAvatarUrl())
                .role(member.getRole().name())
                .joinedAt(member.getJoinedAt())
                .build();
    }
}
