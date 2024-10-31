package com.example.HotelBooking.Controller;

import com.example.HotelBooking.Entity.Login;
import com.example.HotelBooking.Entity.Review;
import com.example.HotelBooking.Repo.LoginRepo;
import com.example.HotelBooking.Repo.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private LoginRepo loginRepo;

    // Get all reviews for the authenticated user
    /*
    @GetMapping(path = "/fetch")
    public ResponseEntity<?> getReviews(Principal principal) {
        String email = principal.getName();  // Get email from Principal
        Login user = loginRepo.findByEmail(email);

        if (user != null) {
            // Fetch reviews by the user
            List<Review> reviews = reviewRepository.findByLogin(user);
            return ResponseEntity.ok(reviews);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
*/
    // Get all reviews
    @GetMapping(path="/fetch")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return ResponseEntity.ok(reviews);
    }

    // Post a review for the authenticated user
    @PostMapping(path = "/save")
    public ResponseEntity<?> postReview(@RequestBody Review review, Principal principal) {
        String email = principal.getName();  // Get email from authenticated user
        Login user = loginRepo.findByEmail(email);

        if (user != null) {
            // Associate the review with the authenticated user
            review.setLogin(user);

            // Save the review
            reviewRepository.save(review);

            return ResponseEntity.status(HttpStatus.CREATED).body("Review posted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }
    // Delete a review by ID
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id, Principal principal) {
        String email = principal.getName();
        Login user = loginRepo.findByEmail(email);

        if (user != null) {
            // Check if the review exists
            if (reviewRepository.existsById(id)) {
                reviewRepository.deleteById(id);
                return ResponseEntity.status(HttpStatus.OK).body("Review deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }
}
