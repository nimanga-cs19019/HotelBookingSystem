package com.example.HotelBooking.Service;

import com.example.HotelBooking.Entity.Offer;
import com.example.HotelBooking.Entity.Room;
import com.example.HotelBooking.Repo.OfferRepository;
import com.example.HotelBooking.Repo.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfferService {
    @Autowired
    private OfferRepository offerRepository;

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public Offer saveOffer(Offer offer) {
        return offerRepository.save(offer);
    }
    public void deleteOffer(Long id) {
        offerRepository.deleteById(id);
    }
    public Offer getOfferById(Long id) {
        return offerRepository.findById(id).orElse(null);
    }
}
