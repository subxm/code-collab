package com.codecollab.service;

import com.codecollab.dto.*;
import com.codecollab.entity.*;
import com.codecollab.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;
    private final UserRepository userRepository;

    private static final String CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final SecureRandom random = new SecureRandom();

    @Transactional
    public RoomResponse createRoom(CreateRoomRequest request, User owner) {
        String roomCode = generateUniqueRoomCode();

        Room room = Room.builder()
                .name(request.getName())
                .roomCode(roomCode)
                .owner(owner)
                .language(request.getLanguage() != null ? request.getLanguage() : "typescript")
                .build();

        room = roomRepository.save(room);

        // Add owner as a member with OWNER role
        RoomMember ownerMember = RoomMember.builder()
                .room(room)
                .user(owner)
                .role(RoomMember.MemberRole.OWNER)
                .build();
        roomMemberRepository.save(ownerMember);

        return RoomResponse.from(room, 1);
    }

    public List<RoomResponse> getUserRooms(User user) {
        List<Room> rooms = roomRepository.findRoomsByMember(user);
        return rooms.stream()
                .map(room -> {
                    int memberCount = roomMemberRepository.findByRoom(room).size();
                    return RoomResponse.from(room, memberCount);
                })
                .collect(Collectors.toList());
    }

    public RoomResponse getRoomById(Long roomId, User user) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Check membership
        if (!roomMemberRepository.existsByRoomAndUser(room, user)) {
            throw new RuntimeException("You are not a member of this room");
        }

        int memberCount = roomMemberRepository.findByRoom(room).size();
        return RoomResponse.from(room, memberCount);
    }

    public RoomResponse getRoomByCode(String roomCode) {
        Room room = roomRepository.findByRoomCode(roomCode)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        int memberCount = roomMemberRepository.findByRoom(room).size();
        return RoomResponse.from(room, memberCount);
    }

    @Transactional
    public RoomResponse joinRoom(String roomCode, User user) {
        Room room = roomRepository.findByRoomCode(roomCode)
                .orElseThrow(() -> new RuntimeException("Invalid room code"));

        if (roomMemberRepository.existsByRoomAndUser(room, user)) {
            // Already a member — just return the room
            int memberCount = roomMemberRepository.findByRoom(room).size();
            return RoomResponse.from(room, memberCount);
        }

        RoomMember member = RoomMember.builder()
                .room(room)
                .user(user)
                .role(RoomMember.MemberRole.EDITOR)
                .build();
        roomMemberRepository.save(member);

        int memberCount = roomMemberRepository.findByRoom(room).size();
        return RoomResponse.from(room, memberCount);
    }

    @Transactional
    public void deleteRoom(Long roomId, User user) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!room.getOwner().getId().equals(user.getId())) {
            throw new RuntimeException("Only the room owner can delete this room");
        }

        roomRepository.delete(room);
    }

    public List<MemberResponse> getRoomMembers(Long roomId, User user) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!roomMemberRepository.existsByRoomAndUser(room, user)) {
            throw new RuntimeException("You are not a member of this room");
        }

        return roomMemberRepository.findByRoom(room).stream()
                .map(MemberResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeMember(Long roomId, Long userId, User currentUser) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Only owner can remove members
        if (!room.getOwner().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Only the room owner can remove members");
        }

        // Can't remove the owner
        if (userId.equals(currentUser.getId())) {
            throw new RuntimeException("Owner cannot remove themselves");
        }

        User targetUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        roomMemberRepository.deleteByRoomAndUser(room, targetUser);
    }

    private String generateUniqueRoomCode() {
        String code;
        do {
            code = generateCode(8);
        } while (roomRepository.existsByRoomCode(code));
        return code;
    }

    private String generateCode(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(CODE_CHARS.charAt(random.nextInt(CODE_CHARS.length())));
        }
        return sb.toString();
    }
}
