package com.codecollab.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FileCreateRequest {
    @NotBlank(message = "File name is required")
    private String name;

    private String language = "javascript";
    private String initialContent = "";
}
