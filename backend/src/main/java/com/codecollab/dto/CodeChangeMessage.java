package com.codecollab.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodeChangeMessage {
    private String type; // "CODE_CHANGE"
    private Long fileId;
    private String content;
    private Long userId;
    private String username;
    private String timestamp;
}
