package com.codecollab.controller;

import com.codecollab.dto.*;
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
@RequestMapping("/api/rooms/{roomId}/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @GetMapping
    public ResponseEntity<List<FileNodeResponse>> getFileTree(
            @PathVariable Long roomId,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(fileService.getFileTree(roomId, user));
    }

    @PostMapping
    public ResponseEntity<FileNodeResponse> createFile(
            @PathVariable Long roomId,
            @Valid @RequestBody CreateFileRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(fileService.createFile(roomId, request, user));
    }

    @PutMapping("/{fileId}")
    public ResponseEntity<FileNodeResponse> updateFile(
            @PathVariable Long roomId,
            @PathVariable Long fileId,
            @RequestBody UpdateFileRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(fileService.updateFile(roomId, fileId, request, user));
    }

    @DeleteMapping("/{fileId}")
    public ResponseEntity<Map<String, String>> deleteFile(
            @PathVariable Long roomId,
            @PathVariable Long fileId,
            @AuthenticationPrincipal User user) {
        fileService.deleteFile(roomId, fileId, user);
        return ResponseEntity.ok(Map.of("message", "File deleted successfully"));
    }
}
