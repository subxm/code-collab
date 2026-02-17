package com.codecollab.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "rooms", indexes = {
    @Index(name = "idx_room_code", columnList = "room_code"),
    @Index(name = "idx_owner", columnList = "owner_id")
})
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "owner_id", nullable = false)
    private String ownerId;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "room_code", nullable = false, unique = true, length = 12)
    private String roomCode;

    @Column(name = "default_lang", nullable = false, length = 30)
    @Builder.Default
    private String defaultLang = "javascript";

    @Column(name = "is_public", nullable = false)
    @Builder.Default
    private Boolean isPublic = false;

    @Column(name = "max_members", nullable = false)
    @Builder.Default
    private Integer maxMembers = 10;

    @Column(name = "exec_timeout_ms", nullable = false)
    @Builder.Default
    private Integer execTimeoutMs = 5000;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "archived_at")
    private LocalDateTime archivedAt;
}
