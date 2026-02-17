package com.codecollab.service;

import com.codecollab.dto.*;
import com.codecollab.entity.FileEntity;
import com.codecollab.repository.FileRepository;
import com.codecollab.repository.RoomMemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileService {

    private final FileRepository fileRepository;
    private final RoomMemberRepository roomMemberRepository;

    public FileService(FileRepository fileRepository,
            RoomMemberRepository roomMemberRepository) {
        this.fileRepository = fileRepository;
        this.roomMemberRepository = roomMemberRepository;
    }

    /**
     * Lists all active (non-deleted) files in a room.
     */
    public List<FileDTO> getFiles(String roomId, String userId) {
        checkMembership(roomId, userId);
        return fileRepository.findByRoomIdAndDeletedAtIsNull(roomId)
                .stream()
                .map(this::toFileDTO)
                .collect(Collectors.toList());
    }

    /**
     * Gets a single file with content.
     */
    public FileDTO getFile(String fileId, String userId) {
        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
        checkMembership(file.getRoomId(), userId);
        return toFileDTO(file);
    }

    /**
     * Creates a new file in a room.
     */
    @Transactional
    public FileDTO createFile(String roomId, FileCreateRequest request, String userId) {
        checkMembership(roomId, userId);

        FileEntity file = FileEntity.builder()
                .roomId(roomId)
                .name(request.getName())
                .language(request.getLanguage())
                .contentSnapshot(request.getInitialContent())
                .createdBy(userId)
                .build();

        file = fileRepository.save(file);
        return toFileDTO(file);
    }

    /**
     * Updates file content snapshot (used during manual save).
     */
    @Transactional
    public FileDTO updateFileContent(String fileId, String content, String userId) {
        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
        checkMembership(file.getRoomId(), userId);

        file.setContentSnapshot(content);
        file = fileRepository.save(file);
        return toFileDTO(file);
    }

    /**
     * Soft-deletes a file (recoverable for 24h).
     */
    @Transactional
    public void deleteFile(String fileId, String userId) {
        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
        checkMembership(file.getRoomId(), userId);

        file.setDeletedAt(LocalDateTime.now());
        fileRepository.save(file);
    }

    private void checkMembership(String roomId, String userId) {
        if (!roomMemberRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new RuntimeException("You are not a member of this room");
        }
    }

    private FileDTO toFileDTO(FileEntity file) {
        return FileDTO.builder()
                .id(file.getId())
                .roomId(file.getRoomId())
                .name(file.getName())
                .language(file.getLanguage())
                .contentSnapshot(file.getContentSnapshot())
                .createdBy(file.getCreatedBy())
                .createdAt(file.getCreatedAt())
                .updatedAt(file.getUpdatedAt())
                .build();
    }
}
