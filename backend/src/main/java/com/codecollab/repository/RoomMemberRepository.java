package com.codecollab.repository;

import com.codecollab.entity.Room;
import com.codecollab.entity.RoomMember;
import com.codecollab.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomMemberRepository extends JpaRepository<RoomMember, Long> {
    List<RoomMember> findByRoom(Room room);

    Optional<RoomMember> findByRoomAndUser(Room room, User user);

    Boolean existsByRoomAndUser(Room room, User user);

    void deleteByRoomAndUser(Room room, User user);
}
