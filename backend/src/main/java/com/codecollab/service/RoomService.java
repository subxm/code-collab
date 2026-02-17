package com.codecollab.service;

import com.codecollab.dto.*;
import com.codecollab.entity.*;
import com.codecollab.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;
    private final UserRepository userRepository;
    private final FileRepository fileRepository;

    public RoomService(RoomRepository roomRepository,
            RoomMemberRepository roomMemberRepository,
            UserRepository userRepository,
            FileRepository fileRepository) {
        this.roomRepository = roomRepository;
        this.roomMemberRepository = roomMemberRepository;
        this.userRepository = userRepository;
        this.fileRepository = fileRepository;
    }

    /**
     * Creates a new room and assigns the creator as OWNER.
     * Generates a unique human-readable room code (e.g., "K7R-MXQP").
     */
    @Transactional
    public RoomDTO createRoom(RoomCreateRequest request, String userId) {
        String roomCode = generateUniqueRoomCode();

        Room room = Room.builder()
                .ownerId(userId)
                .name(request.getName())
                .roomCode(roomCode)
                .defaultLang(request.getLanguage())
                .isPublic(request.getIsPublic())
                .build();

        room = roomRepository.save(room);

        // Add creator as OWNER member
        RoomMember ownerMember = RoomMember.builder()
                .roomId(room.getId())
                .userId(userId)
                .role(RoomMember.Role.OWNER)
                .build();
        roomMemberRepository.save(ownerMember);

        // Create a default file for the room
        FileEntity defaultFile = FileEntity.builder()
                .roomId(room.getId())
                .name(getDefaultFileName(request.getLanguage()))
                .language(request.getLanguage())
                .contentSnapshot(getDefaultContent(request.getLanguage()))
                .createdBy(userId)
                .build();
        fileRepository.save(defaultFile);

        return toRoomDTO(room, List.of(ownerMember));
    }

    /**
     * Gets room details with member list.
     */
    public RoomDTO getRoom(String roomId, String userId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Check membership
        if (!roomMemberRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new RuntimeException("You are not a member of this room");
        }

        List<RoomMember> members = roomMemberRepository.findByRoomId(roomId);
        return toRoomDTO(room, members);
    }

    /**
     * Joins a room by room code.
     */
    @Transactional
    public RoomDTO joinRoom(String roomCode, String userId) {
        Room room = roomRepository.findByRoomCode(roomCode.toUpperCase())
                .orElseThrow(() -> new RuntimeException("Room not found. Check the room code."));

        // Already a member?
        if (roomMemberRepository.existsByRoomIdAndUserId(room.getId(), userId)) {
            List<RoomMember> members = roomMemberRepository.findByRoomId(room.getId());
            return toRoomDTO(room, members);
        }

        // Check room capacity
        long currentCount = roomMemberRepository.countByRoomId(room.getId());
        if (currentCount >= room.getMaxMembers()) {
            throw new RuntimeException("Room is full (max " + room.getMaxMembers() + " members)");
        }

        // Add as EDITOR by default
        RoomMember member = RoomMember.builder()
                .roomId(room.getId())
                .userId(userId)
                .role(RoomMember.Role.EDITOR)
                .build();
        roomMemberRepository.save(member);

        List<RoomMember> members = roomMemberRepository.findByRoomId(room.getId());
        return toRoomDTO(room, members);
    }

    /**
     * Lists all rooms the user is a member of.
     */
    public List<RoomDTO> getUserRooms(String userId) {
        List<RoomMember> memberships = roomMemberRepository.findByUserId(userId);

        return memberships.stream()
                .map(membership -> {
                    Room room = roomRepository.findById(membership.getRoomId()).orElse(null);
                    if (room == null || room.getArchivedAt() != null)
                        return null;
                    List<RoomMember> members = roomMemberRepository.findByRoomId(room.getId());
                    return toRoomDTO(room, members);
                })
                .filter(dto -> dto != null)
                .collect(Collectors.toList());
    }

    /**
     * Deletes a room (owner only).
     */
    @Transactional
    public void deleteRoom(String roomId, String userId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!room.getOwnerId().equals(userId)) {
            throw new RuntimeException("Only the room owner can delete the room");
        }

        roomRepository.delete(room);
    }

    // --- Room code generation ---

    private String generateUniqueRoomCode() {
        String code;
        do {
            code = generateRoomCode();
        } while (roomRepository.existsByRoomCode(code));
        return code;
    }

    /**
     * Generates a 7-character alphanumeric code formatted as XXX-XXXX.
     * Excludes confusable characters (0/O, 1/I/L).
     */
    private String generateRoomCode() {
        String chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
        SecureRandom rng = new SecureRandom();
        String raw = IntStream.range(0, 7)
                .mapToObj(i -> String.valueOf(chars.charAt(rng.nextInt(chars.length()))))
                .collect(Collectors.joining());
        return raw.substring(0, 3) + "-" + raw.substring(3);
    }

    private String getDefaultFileName(String language) {
        return switch (language) {
            case "python" -> "main.py";
            case "java" -> "Main.java";
            case "cpp" -> "main.cpp";
            case "javascript" -> "index.js";
            case "typescript" -> "index.ts";
            case "go" -> "main.go";
            default -> "main." + language;
        };
    }

    private String getDefaultContent(String language) {
        return switch (language) {
            case "python" -> "# Welcome to CodeCollab!\nprint(\"Hello, World!\")\n";
            case "java" ->
                "// Welcome to CodeCollab!\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n";
            case "cpp" ->
                "// Welcome to CodeCollab!\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}\n";
            case "javascript" -> "// Welcome to CodeCollab!\nconsole.log(\"Hello, World!\");\n";
            case "typescript" -> "// Welcome to CodeCollab!\nconsole.log(\"Hello, World!\");\n";
            case "go" ->
                "// Welcome to CodeCollab!\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}\n";
            default -> "// Welcome to CodeCollab!\n";
        };
    }

    private RoomDTO toRoomDTO(Room room, List<RoomMember> members) {
        User owner = userRepository.findById(room.getOwnerId()).orElse(null);
        long fileCount = fileRepository.countByRoomIdAndDeletedAtIsNull(room.getId());

        List<RoomDTO.MemberDTO> memberDTOs = members.stream()
                .map(m -> {
                    User user = userRepository.findById(m.getUserId()).orElse(null);
                    return RoomDTO.MemberDTO.builder()
                            .userId(m.getUserId())
                            .displayName(user != null ? user.getDisplayName() : "Unknown")
                            .email(user != null ? user.getEmail() : "")
                            .avatarUrl(user != null ? user.getAvatarUrl() : null)
                            .role(m.getRole().name())
                            .joinedAt(m.getJoinedAt())
                            .build();
                })
                .collect(Collectors.toList());

        return RoomDTO.builder()
                .id(room.getId())
                .name(room.getName())
                .roomCode(room.getRoomCode())
                .defaultLang(room.getDefaultLang())
                .isPublic(room.getIsPublic())
                .maxMembers(room.getMaxMembers())
                .ownerId(room.getOwnerId())
                .ownerName(owner != null ? owner.getDisplayName() : "Unknown")
                .memberCount(members.size())
                .createdAt(room.getCreatedAt())
                .updatedAt(room.getUpdatedAt())
                .members(memberDTOs)
                .build();
    }
}
