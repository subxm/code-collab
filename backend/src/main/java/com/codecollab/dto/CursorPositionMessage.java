package com.codecollab.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CursorPositionMessage {
    private String type; // "CURSOR_UPDATE"
    private Long fileId;
    private int line;
    private int column;
    private Long userId;
    private String username;
    private String color;
}
