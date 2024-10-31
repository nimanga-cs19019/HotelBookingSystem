package com.example.HotelBooking.Controller;

import com.example.HotelBooking.Entity.Login;
import com.example.HotelBooking.Repo.LoginRepo;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin
public class PaymentController {

    @Value("${STRIPE_SECRET_KEY}")
    private String stripeSecretKey;

    @Autowired
    private LoginRepo loginRepo;

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createPaymentIntent(@Valid @RequestBody Map<String, Object> request) {
        Stripe.apiKey = stripeSecretKey;
        Map<String, Object> response = new HashMap<>();

        // Validate amount
        if (!request.containsKey("amount") || !(request.get("amount") instanceof Number)) {
            response.put("error", "Invalid amount provided");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        long amount = ((Number) request.get("amount")).longValue(); // amount in cents

        // Retrieve customer email from the request
        String customerEmail = (String) request.get("email");
        Login user = loginRepo.findByEmail(customerEmail);

        // Check if user exists
        if (user == null) {
            response.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        try {
            // Create a PaymentIntent associated with the customer
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amount) // amount in cents
                    .setCurrency("LKR")
                    .setCustomer(user.getCustomer_id()) // Associate the payment with the customer
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);
            response.put("clientSecret", paymentIntent.getClientSecret());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
