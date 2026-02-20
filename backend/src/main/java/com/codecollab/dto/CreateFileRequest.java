package com.codecollab.dto;

import com.codecollab.entity.FileNode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateFileRequest {
    @NotBlank(message = "File name is required")
    private String name;

    @NotNull(message = "File type is required (FILE or FOLDER)")
    private FileNode.FileType type;

    private Long parentId;
    private String content;
    private String language;
}
