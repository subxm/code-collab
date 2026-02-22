package com.codecollab.service;

import com.codecollab.dto.CreateFileRequest;
import com.codecollab.dto.FileNodeResponse;
import com.codecollab.entity.FileNode;
import com.codecollab.entity.Room;
import com.codecollab.entity.User;
import com.codecollab.repository.FileNodeRepository;
import com.codecollab.repository.RoomMemberRepository;
import com.codecollab.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
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
    public FileNodeResponse updateFileContent(Long fileId, String content, User user) {
        FileNode file = fileNodeRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
        
        getAuthorizedRoom(file.getRoom().getId(), user);
        
        file.setContent(content);
        file = fileNodeRepository.save(file);
        
        return FileNodeResponse.from(file, Collections.emptyList());
    }
    
    @Transactional
    public void deleteFile(Long fileId, User user) {
        FileNode file = fileNodeRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
        
        getAuthorizedRoom(file.getRoom().getId(), user);
        
        fileNodeRepository.delete(file);
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
        List<FileNode> rootFiles = allFiles.stream()
                .filter(file -> file.getParent() == null)
                .collect(Collectors.toList());
        
        return rootFiles.stream()
                .map(file -> buildNode(file, allFiles))
                .collect(Collectors.toList());
    }
    
    private FileNodeResponse buildNode(FileNode node, List<FileNode> allFiles) {
        List<FileNode> children = allFiles.stream()
                .filter(file -> file.getParent() != null && file.getParent().getId().equals(node.getId()))
                .collect(Collectors.toList());
        
        List<FileNodeResponse> childResponses = children.stream()
                .map(child -> buildNode(child, allFiles))
                .collect(Collectors.toList());
        
        return FileNodeResponse.from(node, childResponses);
    }
    
    private String detectLanguage(String filename) {
        if (filename.endsWith(".java")) return "java";
        if (filename.endsWith(".js") || filename.endsWith(".jsx")) return "javascript";
        if (filename.endsWith(".ts") || filename.endsWith(".tsx")) return "typescript";
        if (filename.endsWith(".py")) return "python";
        if (filename.endsWith(".html")) return "html";
        if (filename.endsWith(".css")) return "css";
        if (filename.endsWith(".json")) return "json";
        if (filename.endsWith(".md")) return "markdown";
        return "plaintext";
    }
}
