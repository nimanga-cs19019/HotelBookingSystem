package com.example.HotelBooking.Repo;

import com.example.HotelBooking.Entity.Login;
import com.example.HotelBooking.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface ReviewRepository extends JpaRepository<Review,Long> {

}
