package com.codecollab.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateRoomRequest {
    @NotBlank(message = "Room name is required")
    @Size(min = 2, max = 100, message = "Room name must be between 2 and 100 characters")
    private String name;

    private String language = "typescript";
}
