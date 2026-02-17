package com.codecollab.controller;

import com.codecollab.dto.*;
import com.codecollab.entity.User;
import com.codecollab.service.FileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms/{roomId}/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    /**
     * GET /api/rooms/{roomId}/files — List all active files in a room.
     */
    @GetMapping
    public ResponseEntity<List<FileDTO>> getFiles(@PathVariable String roomId,
            @AuthenticationPrincipal User user) {
        List<FileDTO> files = fileService.getFiles(roomId, user.getId());
        return ResponseEntity.ok(files);
    }

    /**
     * POST /api/rooms/{roomId}/files — Create a new file in a room.
     */
    @PostMapping
    public ResponseEntity<FileDTO> createFile(@PathVariable String roomId,
            @Valid @RequestBody FileCreateRequest request,
            @AuthenticationPrincipal User user) {
        FileDTO file = fileService.createFile(roomId, request, user.getId());
        return ResponseEntity.ok(file);
    }

    /**
     * GET /api/rooms/{roomId}/files/{fileId} — Get file content and metadata.
     */
    @GetMapping("/{fileId}")
    public ResponseEntity<FileDTO> getFile(@PathVariable String roomId,
            @PathVariable String fileId,
            @AuthenticationPrincipal User user) {
        FileDTO file = fileService.getFile(fileId, user.getId());
        return ResponseEntity.ok(file);
    }

    /**
     * PATCH /api/rooms/{roomId}/files/{fileId} — Update file content.
     */
    @PatchMapping("/{fileId}")
    public ResponseEntity<FileDTO> updateFile(@PathVariable String roomId,
            @PathVariable String fileId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal User user) {
        String content = body.get("content");
        FileDTO file = fileService.updateFileContent(fileId, content, user.getId());
        return ResponseEntity.ok(file);
    }

    /**
     * DELETE /api/rooms/{roomId}/files/{fileId} — Soft-delete a file.
     */
    @DeleteMapping("/{fileId}")
    public ResponseEntity<Void> deleteFile(@PathVariable String roomId,
            @PathVariable String fileId,
            @AuthenticationPrincipal User user) {
        fileService.deleteFile(fileId, user.getId());
        return ResponseEntity.noContent().build();
    }
}
