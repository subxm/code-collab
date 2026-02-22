package com.codecollab.dto;

import com.codecollab.entity.FileNode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileNodeResponse {
    private Long id;
    private String name;
    private FileNode.FileType type;
    private String content;
    private String language;
    private Long parentId;
    private List<FileNodeResponse> children;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static FileNodeResponse from(FileNode fileNode, List<FileNodeResponse> children) {
        return FileNodeResponse.builder()
                .id(fileNode.getId())
                .name(fileNode.getName())
                .type(fileNode.getType())
                .content(fileNode.getContent())
                .language(fileNode.getLanguage())
                .parentId(fileNode.getParent() != null ? fileNode.getParent().getId() : null)
                .children(children)
                .createdAt(fileNode.getCreatedAt())
                .updatedAt(fileNode.getUpdatedAt())
                .build();
    }
}
