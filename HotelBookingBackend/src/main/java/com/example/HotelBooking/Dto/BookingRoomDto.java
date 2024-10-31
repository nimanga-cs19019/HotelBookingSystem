package com.example.HotelBooking.Dto;

import com.example.HotelBooking.Entity.BookingRoom;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingRoomDto {
    private Long id;
    private int loginId;
    private String customerId;
    private String roomType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numRooms;
    private long totalBalance;
    private String status;
    private LocalDateTime cancellationDate;



    public BookingRoomDto(BookingRoom bookingRoom){
        this.id = bookingRoom.getId();
        this.roomType = bookingRoom.getRoomType();
        this.checkInDate = bookingRoom.getCheckInDate();
        this.checkOutDate = bookingRoom.getCheckOutDate();
        this.numRooms = bookingRoom.getNumRooms();
        this.totalBalance = bookingRoom.getTotalBalance();
        this.status = bookingRoom.getStatus();
        this.loginId = bookingRoom.getLogin().getLoginid();
        this.customerId=bookingRoom.getLogin().getCustomer_id();
        this.cancellationDate=bookingRoom.getCancellationDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public int getLoginId() {
        return loginId;
    }

    public void setLoginId(int loginId) {
        this.loginId = loginId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public LocalDateTime getCancellationDate() {
        return cancellationDate;
    }

    public void setCancellationDate(LocalDateTime cancellationDate) {
        this.cancellationDate = cancellationDate;
    }
}
