package com.codecollab.service;

import com.codecollab.dto.*;
import com.codecollab.entity.*;
import com.codecollab.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileNodeRepository fileNodeRepository;
    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;

    public List<FileNodeResponse> getFileTree(Long roomId, User user) {
        Room room = getAuthorizedRoom(roomId, user);
        List<FileNode> allFiles = fileNodeRepository.findByRoomOrderBySortOrder(room);
        return buildTree(allFiles);
    }

    @Transactional
    public FileNodeResponse createFile(Long roomId, CreateFileRequest request, User user) {
        Room room = getAuthorizedRoom(roomId, user);

        FileNode parent = null;
        if (request.getParentId() != null) {
            parent = fileNodeRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent folder not found"));
        }

        FileNode file = FileNode.builder()
                .room(room)
                .parent(parent)
                .name(request.getName())
                .type(request.getType())
                .content(request.getContent())
                .language(request.getLanguage() != null ? request.getLanguage() : detectLanguage(request.getName()))
                .build();

        file = fileNodeRepository.save(file);
        return FileNodeResponse.from(file, Collections.emptyList());
    }

    @Transactional
    public FileNodeResponse updateFile(Long roomId, Long fileId, UpdateFileRequest request, User user) {
        getAuthorizedRoom(roomId, user);

        FileNode file = fileNodeRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        if (request.getName() != null) {
            file.setName(request.getName());
        }
        if (request.getContent() != null) {
            file.setContent(request.getContent());
        }
        if (request.getLanguage() != null) {
            file.setLanguage(request.getLanguage());
        }

        file = fileNodeRepository.save(file);
        return FileNodeResponse.from(file, Collections.emptyList());
    }

    @Transactional
    public void deleteFile(Long roomId, Long fileId, User user) {
        getAuthorizedRoom(roomId, user);

        FileNode file = fileNodeRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        // Delete children recursively
        deleteRecursive(file);
    }

    private void deleteRecursive(FileNode node) {
        List<FileNode> children = fileNodeRepository.findByParentOrderBySortOrder(node);
        for (FileNode child : children) {
            deleteRecursive(child);
        }
        fileNodeRepository.delete(node);
    }

    private Room getAuthorizedRoom(Long roomId, User user) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!roomMemberRepository.existsByRoomAndUser(room, user)) {
            throw new RuntimeException("You are not a member of this room");
        }

        return room;
    }

    private List<FileNodeResponse> buildTree(List<FileNode> allFiles) {
        Map<Long, List<FileNode>> childrenMap = new HashMap<>();
        List<FileNode> roots = new ArrayList<>();

        for (FileNode file : allFiles) {
            if (file.getParent() == null) {
                roots.add(file);
            } else {
                childrenMap.computeIfAbsent(file.getParent().getId(), k -> new ArrayList<>()).add(file);
            }
        }

        return roots.stream()
                .map(root -> buildNodeResponse(root, childrenMap))
                .collect(Collectors.toList());
    }

    private FileNodeResponse buildNodeResponse(FileNode node, Map<Long, List<FileNode>> childrenMap) {
        List<FileNode> children = childrenMap.getOrDefault(node.getId(), Collections.emptyList());
        List<FileNodeResponse> childResponses = children.stream()
                .map(child -> buildNodeResponse(child, childrenMap))
                .collect(Collectors.toList());
        return FileNodeResponse.from(node, childResponses);
    }

    private String detectLanguage(String filename) {
        if (filename == null)
            return null;
        String ext = filename.contains(".") ? filename.substring(filename.lastIndexOf(".") + 1) : "";
        return switch (ext.toLowerCase()) {
            case "js" -> "javascript";
            case "ts" -> "typescript";
            case "tsx" -> "typescriptreact";
            case "jsx" -> "javascriptreact";
            case "py" -> "python";
            case "java" -> "java";
            case "html" -> "html";
            case "css" -> "css";
            case "json" -> "json";
            case "md" -> "markdown";
            case "sql" -> "sql";
            case "xml" -> "xml";
            case "yml", "yaml" -> "yaml";
            default -> "plaintext";
        };
    }
}
