package com.codecollab.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "room_members")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@IdClass(RoomMember.RoomMemberId.class)
public class RoomMember {

    @Id
    @Column(name = "room_id", nullable = false)
    private String roomId;

    @Id
    @Column(name = "user_id", nullable = false)
    private String userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    @Builder.Default
    private Role role = Role.EDITOR;

    @CreationTimestamp
    @Column(name = "joined_at", nullable = false, updatable = false)
    private LocalDateTime joinedAt;

    @Column(name = "last_active_at")
    private LocalDateTime lastActiveAt;

    public enum Role {
        OWNER, EDITOR, VIEWER
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RoomMemberId implements Serializable {
        private String roomId;
        private String userId;
    }
}
