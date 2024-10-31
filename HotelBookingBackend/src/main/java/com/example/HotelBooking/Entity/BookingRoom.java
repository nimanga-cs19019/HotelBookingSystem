package com.example.HotelBooking.Entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class BookingRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;
    private String   roomType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numRooms;
    private long totalBalance;
    private String status;
    private LocalDateTime cancellationDate;

    // Many-to-One relationship to the Login (user) entity
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "login_id", nullable = false)
    private Login login;

    // Many-to-One relationship to the Login (user) entity
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;


    public BookingRoom() {
    }

    public BookingRoom(Long id, String roomType, LocalDate checkInDate, LocalDate checkOutDate, int numRooms, long totalBalance, String status, LocalDateTime cancellationDate, Login login, Room room) {
        this.id = id;
        this.roomType = roomType;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.numRooms = numRooms;
        this.totalBalance = totalBalance;
        this.status = status;
        this.cancellationDate = cancellationDate;
        this.login = login;
        this.room = room;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Login getLogin() {
        return login;
    }
    public void setLogin(Login login) {
        this.login = login;
    }
    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public int getNumRooms() {
        return numRooms;
    }

    public void setNumRooms(int numRooms) {
        this.numRooms = numRooms;
    }

    public long getTotalBalance() {
        return totalBalance;
    }

    public void setTotalBalance(long totalBalance) {
        this.totalBalance = totalBalance;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCancellationDate() {
        return cancellationDate;
    }

    public void setCancellationDate(LocalDateTime cancellationDate) {
        this.cancellationDate = cancellationDate;
    }
}
