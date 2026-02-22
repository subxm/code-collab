package com.codecollab.dto;

import com.codecollab.entity.FileNode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateFileRequest {
    
    @NotBlank(message = "File name is required")
    private String name;
    
    @NotNull(message = "File type is required")
    private FileNode.FileType type;
    
    private String content;
    private String language;
    private Long parentId;
}
