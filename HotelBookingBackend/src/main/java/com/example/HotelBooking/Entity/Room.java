package com.example.HotelBooking.Entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Room {
    @Id
    @Column(name="room_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String roomType;
    private String length;
    private String Description;
    @ElementCollection
    @CollectionTable(name = "room_features", joinColumns = @JoinColumn(name = "room_feature_id"))
    private List<String> features;
    private int rentpernight;
    private String image;
    private int quantity;
    private int availability;
    public Room() {
    }

    public Room(Long id, String roomType, String length, String description, List<String> features, int rentpernight, String image, int quantity, int availability) {
        this.id = id;
        this.roomType = roomType;
        this.length = length;
        Description = description;
        this.features = features;
        this.rentpernight = rentpernight;
        this.image = image;
        this.quantity = quantity;
        this.availability = availability;
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

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

    public int getRentpernight() {
        return rentpernight;
    }

    public void setRentpernight(int rentpernight) {
        this.rentpernight = rentpernight;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setAvailibilty(int availability) {
    }

    public int getAvailability() {
        return availability;
    }

    public void setAvailability(int availability) {
        this.availability = availability;
    }
}
