package com.example.HotelBooking.Controller;

import com.example.HotelBooking.Entity.Offer;
import com.example.HotelBooking.Service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin
public class OfferController {
    @Autowired
    private OfferService offerService;
    //method for getting all offers
    @GetMapping("/fetch")
    public List<Offer> getAllRooms() {
        return offerService.getAllOffers();
    }
    //method for saving an offer
    @PostMapping("/save")
    public ResponseEntity<Offer> saveOffer(@RequestBody Offer offer) {
        Offer savedOffer = offerService.saveOffer(offer);
        return ResponseEntity.ok(savedOffer);  // Return the saved room with HTTP 200 OK status
    }
    //method for deleting an offer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        offerService.deleteOffer(id);
        return ResponseEntity.noContent().build();
    }
    //method for updating an offer
    @PatchMapping("/{id}")
    public ResponseEntity<Offer> updateOffer(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Offer existingOffer = offerService.getOfferById(id); // Retrieve existing room
        if (existingOffer == null) {
            return ResponseEntity.notFound().build(); // Room not found
        }

        //updates to the existing room
        updates.forEach((key, value) -> {
            switch (key) {

                case "description":
                    existingOffer.setDescription((String) value);
                    break;
                case "image":
                    existingOffer.setImage((String) value);
                    break;

            }
        });

        Offer updatedOffer = offerService.saveOffer(existingOffer); // Save the updated room
        return ResponseEntity.ok(updatedOffer);
    }
}
