package com.codecollab.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RoomCreateRequest {
    @NotBlank(message = "Room name is required")
    @Size(min = 1, max = 150)
    private String name;

    private String language = "javascript";
    private Boolean isPublic = false;
}
