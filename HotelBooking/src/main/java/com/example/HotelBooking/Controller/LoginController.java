package com.example.HotelBooking.Controller;
import com.example.HotelBooking.Dto.LoginDto;
import com.example.HotelBooking.Dto.RegisterDto;
import com.example.HotelBooking.Service.LoginService;
import com.example.HotelBooking.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping(path="/SignUp")
    public String saveRecord(@RequestBody LoginDto loginDto)
    {

        return loginService.addLogin(loginDto);
    }
    @PostMapping(path="/SignIn")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto)
    {
        LoginResponse loginResponse =loginService.register(registerDto);
        return ResponseEntity.ok(loginResponse);
    }


}
