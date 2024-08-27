package com.example.HotelBooking.Service;

import com.example.HotelBooking.Dto.LoginDto;
import com.example.HotelBooking.Dto.RegisterDto;
import com.example.HotelBooking.response.LoginResponse;

public interface LoginService {

    String addLogin(LoginDto loginDto);

    LoginResponse register(RegisterDto registerDto);
}
