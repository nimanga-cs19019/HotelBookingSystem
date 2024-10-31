package com.example.HotelBooking.Repo;

import com.example.HotelBooking.Entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface LoginRepo extends JpaRepository<Login,Integer> {
    public Login findByEmail(String email);

    Login findByResetPasswordToken(String resetPasswordToken);
}
