package com.codecollab.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileDTO {
    private String id;
    private String roomId;
    private String name;
    private String language;
    private String contentSnapshot;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
