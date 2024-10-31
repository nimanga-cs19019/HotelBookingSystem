package com.example.HotelBooking.Service;

import com.example.HotelBooking.Entity.Room;
import com.example.HotelBooking.Repo.BookingRoomRepository;
import com.example.HotelBooking.Repo.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private BookingRoomRepository bookingRoomRepository;
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // New method for saving a room
    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
    public Room getRoomById(Long id) {
        return roomRepository.findById(id).orElse(null);
    }

}
