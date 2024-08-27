package com.example.HotelBooking.Dto;

public class RegisterDto {
    private String email;
    private String password;

    public RegisterDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public RegisterDto() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "RegisterDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
