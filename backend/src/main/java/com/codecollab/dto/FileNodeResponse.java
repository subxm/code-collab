package com.codecollab.dto;

import com.codecollab.entity.FileNode;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FileNodeResponse {
    private Long id;
    private String name;
    private String type;
    private String content;
    private String language;
    private Long parentId;
    private Integer sortOrder;
    private List<FileNodeResponse> children;

    public static FileNodeResponse from(FileNode node, List<FileNodeResponse> children) {
        return FileNodeResponse.builder()
                .id(node.getId())
                .name(node.getName())
                .type(node.getType().name())
                .content(node.getContent())
                .language(node.getLanguage())
                .parentId(node.getParent() != null ? node.getParent().getId() : null)
                .sortOrder(node.getSortOrder())
                .children(children)
                .build();
    }
}
