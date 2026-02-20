package com.codecollab.repository;

import com.codecollab.entity.Room;
import com.codecollab.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByRoomCode(String roomCode);

    List<Room> findByOwner(User owner);

    Boolean existsByRoomCode(String roomCode);

    @Query("SELECT r FROM Room r JOIN RoomMember rm ON rm.room = r WHERE rm.user = :user")
    List<Room> findRoomsByMember(@Param("user") User user);
}
