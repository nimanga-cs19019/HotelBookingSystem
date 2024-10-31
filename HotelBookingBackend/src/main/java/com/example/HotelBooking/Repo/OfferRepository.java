package com.example.HotelBooking.Repo;

import com.example.HotelBooking.Entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfferRepository extends JpaRepository<Offer,Long> {
}
