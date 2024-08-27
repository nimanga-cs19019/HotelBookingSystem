package com.example.HotelBooking.Service.Impl;

import com.example.HotelBooking.Dto.LoginDto;
import com.example.HotelBooking.Dto.RegisterDto;
import com.example.HotelBooking.Entity.Login;
import com.example.HotelBooking.Repo.LoginRepo;
import com.example.HotelBooking.Service.LoginService;
import com.example.HotelBooking.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class
LoginImpl implements LoginService {
    @Autowired
    private LoginRepo loginRepo;

    /*
    @Autowired
    public LoginImpl(LoginRepo loginRepo) {
        this.loginRepo = loginRepo;
    }
    */
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addLogin(LoginDto loginDto) {
        Login login = new Login(
                loginDto.getLoginid(),
                loginDto.getLoginname(),
                loginDto.getEmail(),
                this.passwordEncoder.encode(loginDto.getPassword())
        );

        loginRepo.save(login);
        return login.getLoginname();
    }

    @Override
    public LoginResponse register(RegisterDto registerDto) {
        String msg = "";
        Login login1 = loginRepo.findByEmail(registerDto.getEmail());
        if(login1!=null)
        {
            String password = registerDto.getPassword();
            String encodedPassword =login1.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password,encodedPassword);
            if (isPwdRight)
            {
                Optional<Login> login=loginRepo.findOneByEmailAndPassword(registerDto.getEmail(),encodedPassword);
                if(login.isPresent())
                {
                    return new LoginResponse("Login Success",true);
                }
                else
                {
                    return new LoginResponse("Login failed",false);
                }
            }
            else{
                return new LoginResponse("password Not Match",false);
            }

        }
        else {
            return new LoginResponse("Email not exits",false);
        }
    }

}
