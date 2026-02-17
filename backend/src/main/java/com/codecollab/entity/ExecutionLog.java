package com.codecollab.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "execution_logs", indexes = {
    @Index(name = "idx_room_exec", columnList = "room_id, executed_at")
})
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ExecutionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "room_id", nullable = false)
    private String roomId;

    @Column(name = "file_id")
    private String fileId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(nullable = false, length = 30)
    private String language;

    @Column(name = "code_snapshot", nullable = false, columnDefinition = "TEXT")
    private String codeSnapshot;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String stdout;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String stderr;

    @Column(name = "exit_code")
    private Integer exitCode;

    @Column(name = "duration_ms")
    private Integer durationMs;

    @Column(name = "timed_out", nullable = false)
    @Builder.Default
    private Boolean timedOut = false;

    @CreationTimestamp
    @Column(name = "executed_at", nullable = false, updatable = false)
    private LocalDateTime executedAt;
}
