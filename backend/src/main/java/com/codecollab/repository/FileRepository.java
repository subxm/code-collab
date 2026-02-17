package com.codecollab.repository;

import com.codecollab.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, String> {
    List<FileEntity> findByRoomIdAndDeletedAtIsNull(String roomId);

    long countByRoomIdAndDeletedAtIsNull(String roomId);
}
