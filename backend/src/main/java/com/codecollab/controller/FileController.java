package com.codecollab.controller;

import com.codecollab.dto.CreateFileRequest;
import com.codecollab.dto.FileNodeResponse;
import com.codecollab.entity.User;
import com.codecollab.service.FileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {
    
    private final FileService fileService;
    
    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<FileNodeResponse>> getFileTree(
            @PathVariable Long roomId,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(fileService.getFileTree(roomId, user));
    }
    
    @PostMapping("/room/{roomId}")
    public ResponseEntity<FileNodeResponse> createFile(
            @PathVariable Long roomId,
            @Valid @RequestBody CreateFileRequest request,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(fileService.createFile(roomId, request, user));
    }
    
    @PutMapping("/{fileId}")
    public ResponseEntity<FileNodeResponse> updateFileContent(
            @PathVariable Long fileId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal User user
    ) {
        String content = body.get("content");
        return ResponseEntity.ok(fileService.updateFileContent(fileId, content, user));
    }
    
    @DeleteMapping("/{fileId}")
    public ResponseEntity<Map<String, String>> deleteFile(
            @PathVariable Long fileId,
            @AuthenticationPrincipal User user
    ) {
        fileService.deleteFile(fileId, user);
        return ResponseEntity.ok(Map.of("message", "File deleted successfully"));
    }
}
