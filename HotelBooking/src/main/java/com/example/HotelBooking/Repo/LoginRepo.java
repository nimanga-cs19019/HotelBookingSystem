package com.example.HotelBooking.Repo;

import com.example.HotelBooking.Entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface LoginRepo extends JpaRepository<Login,Integer> {

    Optional<Login> findOneByEmailAndPassword(String email,String password);
    Login findByEmail(String email);
}
