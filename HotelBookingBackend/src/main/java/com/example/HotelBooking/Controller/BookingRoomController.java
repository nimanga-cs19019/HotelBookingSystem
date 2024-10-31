package com.example.HotelBooking.Controller;

import com.example.HotelBooking.Dto.BookingRoomDto;
import com.example.HotelBooking.Entity.BookingRoom;
import com.example.HotelBooking.Entity.Login;
import com.example.HotelBooking.Entity.Room;
import com.example.HotelBooking.Repo.BookingRoomRepository;
import com.example.HotelBooking.Repo.LoginRepo;
import com.example.HotelBooking.Repo.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/bookingRoom")
public class BookingRoomController {
    @Autowired
    private BookingRoomRepository bookingRoomRepository;
    @Autowired
    private LoginRepo loginRepo;
    @Autowired
    private RoomRepository roomRepository;

    // Book a room for the authenticated user
    @PostMapping(path = "/save")
    public ResponseEntity<?> bookRoom(@RequestBody Map<String, Object> bookingRoomData, Principal principal) {
        String email = principal.getName(); //Get email from authenticated user
        Login user = loginRepo.findByEmail(email);
        if (bookingRoomData.get("room_id") == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Room ID is required.");
        }

        if (user != null) {
            //room_id from the bookingRoomData
            Long roomId = Long.valueOf(bookingRoomData.get("room_id").toString());

            // Fetch the Room using room_id from the request
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new RuntimeException("Room not found"));

            // Create a new BookingRoom object
            BookingRoom bookingRoom = new BookingRoom();
            bookingRoom.setRoom(room); // Set the Room object in bookingRoom
            bookingRoom.setLogin(user); // Associate the booking with the authenticated user
            bookingRoom.setCheckInDate(LocalDate.parse(bookingRoomData.get("checkInDate").toString()));
            bookingRoom.setCheckOutDate(LocalDate.parse(bookingRoomData.get("checkOutDate").toString()));
            bookingRoom.setNumRooms(Integer.parseInt(bookingRoomData.get("numRooms").toString()));
            bookingRoom.setTotalBalance(Long.parseLong(bookingRoomData.get("totalBalance").toString()));
            bookingRoom.setRoomType(bookingRoomData.get("roomType").toString());
            //save the bookingRoom
            bookingRoomRepository.save(bookingRoom);
            // Save the room
            roomRepository.save(room);
            return ResponseEntity.ok(new BookingRoomDto(bookingRoom));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }

    /*//Get all booking details for the authenticated user
    @GetMapping(path = "/fetch")
    public ResponseEntity<?> getDetails(Principal principal) {
        String email = principal.getName();  // Get email from Principal
        Login user = loginRepo.findByEmail(email);

        if (user != null) {
            // Fetch bookings by the user
            List<BookingRoom> booking = bookingRoomRepository.findByLogin(user);
            return ResponseEntity.ok(booking);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    // Get all bookings
    @GetMapping(path="/fetchAll")
    public ResponseEntity<List<BookingRoom>> getAllBookings() {
        List<BookingRoom> bookings = bookingRoomRepository.findAll();
        return ResponseEntity.ok(bookings);
    }*/


    //Get the latest booking
    @GetMapping(path = "/latest")
    public ResponseEntity<?> getLatestBooking(Principal principal) {
        String email = principal.getName();  // Get email from Principal
        Login user = loginRepo.findByEmail(email);

        if (user != null) {
            // Fetch the most recent booking for the user
            BookingRoom latestBooking = bookingRoomRepository.findTopByLoginOrderByIdDesc(user);
            return ResponseEntity.ok(new BookingRoomDto(latestBooking));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    //Update booking status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            BookingRoom bookingRoom = bookingRoomRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Booking not found for this id: " + id));
            bookingRoom.setStatus(status);
            bookingRoom.setCancellationDate(LocalDateTime.now());
            bookingRoomRepository.save(bookingRoom);
            return ResponseEntity.ok(new BookingRoomDto(bookingRoom));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update booking status.");
        }
    }

    //check room availability
    @PostMapping(path = "/check-availability")
    public ResponseEntity<?> checkRoomAvailability(@RequestBody Map<String, Object> bookingData) {
        if (bookingData.get("room_id") == null || bookingData.get("checkInDate") == null || bookingData.get("checkOutDate") == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Room ID, Check-in, and Check-out dates are required.");
        }

        Long roomId = Long.valueOf(bookingData.get("room_id").toString());
        LocalDate checkInDate = LocalDate.parse(bookingData.get("checkInDate").toString());
        LocalDate checkOutDate = LocalDate.parse(bookingData.get("checkOutDate").toString());

        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));

        List<BookingRoom> overlappingBookings = bookingRoomRepository.findOverlappingBookings(room.getId(), checkInDate, checkOutDate);
        int totalBookedRooms = overlappingBookings.stream().mapToInt(BookingRoom::getNumRooms).sum();
        int availableRooms = room.getQuantity() - totalBookedRooms;

        Map<String, Object> response = new HashMap<>();
        response.put("availableRooms", availableRooms);

        return ResponseEntity.ok(response);
    }
    //get authenticated user booking details
    @GetMapping(path = "/fetch")
    public ResponseEntity<?> getDetails(Principal principal) {
        String email = principal.getName();
        Login user = loginRepo.findByEmail(email);

        if (user != null) {
            List<BookingRoom> bookings = bookingRoomRepository.findByLogin(user);
            //Convert each BookingRoom to BookingRoomDTO
            List<BookingRoomDto> bookingDTOs = bookings.stream()
                    .map(BookingRoomDto::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(bookingDTOs);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    // Get all bookings
    @GetMapping(path = "/fetchAll")
    public ResponseEntity<List<BookingRoomDto>> getAllBookings() {
        List<BookingRoom> bookings = bookingRoomRepository.findAll();
        List<BookingRoomDto> bookingDTOs = bookings.stream()
                .map(BookingRoomDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bookingDTOs);
    }

}
