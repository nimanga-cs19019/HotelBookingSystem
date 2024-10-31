package com.example.HotelBooking.Controller;

import com.example.HotelBooking.Entity.BookingRoom;
import com.example.HotelBooking.Entity.Room;
import com.example.HotelBooking.Repo.BookingRoomRepository;
import com.example.HotelBooking.Repo.RoomRepository;
import com.example.HotelBooking.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin
public class RoomController {
    @Autowired
    private RoomService roomService;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private BookingRoomRepository bookingRoomRepository;
    //method for getting all rooms
    @GetMapping("/fetch")
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    //method for saving a room
    @PostMapping("/save")
    public ResponseEntity<Room> saveRoom(@RequestBody Room room) {
        Room savedRoom = roomService.saveRoom(room);
        return ResponseEntity.ok(savedRoom);  // Return the saved room with HTTP 200 OK status
    }
    //method for deleting a room
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
    //method for updating a room
    @PatchMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Room existingRoom = roomService.getRoomById(id); // Retrieve existing room
        if (existingRoom == null) {
            return ResponseEntity.notFound().build(); // Room not found
        }

        // updates to the existing room
        updates.forEach((key, value) -> {
            switch (key) {
                case "roomType":
                    existingRoom.setRoomType((String) value);
                    break;
                case "length":
                    existingRoom.setLength((String) value);
                    break;
                case "description":
                    existingRoom.setDescription((String) value);
                    break;
                case "features":
                    existingRoom.setFeatures((List<String>) value);
                    break;
                case "rentpernight":
                    existingRoom.setRentpernight((int) value);
                    break;
                case "image":
                    existingRoom.setImage((String) value);
                    break;
                case "quantity":
                    existingRoom.setQuantity((int) value);
                    break;
            }
        });
        Room updatedRoom = roomService.saveRoom(existingRoom); // Save the updated room
        return ResponseEntity.ok(updatedRoom);
    }


}
