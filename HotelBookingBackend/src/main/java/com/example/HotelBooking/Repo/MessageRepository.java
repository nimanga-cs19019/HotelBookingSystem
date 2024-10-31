package com.example.HotelBooking.Repo;

import com.example.HotelBooking.Entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message,Long> {

}
