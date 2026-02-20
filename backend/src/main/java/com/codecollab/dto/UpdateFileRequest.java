package com.codecollab.dto;

import lombok.Data;

@Data
public class UpdateFileRequest {
    private String name;
    private String content;
    private String language;
}
