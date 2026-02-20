package com.codecollab.repository;

import com.codecollab.entity.ChatMessage;
import com.codecollab.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    Page<ChatMessage> findByRoomOrderByCreatedAtDesc(Room room, Pageable pageable);
}
