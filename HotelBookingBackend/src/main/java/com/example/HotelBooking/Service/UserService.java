package com.example.HotelBooking.Service;

import com.example.HotelBooking.Entity.Login;
import com.example.HotelBooking.Repo.LoginRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private LoginRepo loginRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Login user = loginRepo.findByEmail(username);

        if (user != null) {
           var springuser =User.withUsername(user.getEmail())
                   .password(user.getPassword())
                   .build();
           return  springuser;
        }


        return null;
    }
}
