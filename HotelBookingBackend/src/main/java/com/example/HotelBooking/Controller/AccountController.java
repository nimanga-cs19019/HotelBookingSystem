package com.example.HotelBooking.Controller;

import com.example.HotelBooking.Dto.SignInDto;
import com.example.HotelBooking.Dto.SignUpDto;
import com.example.HotelBooking.Entity.Login;
import com.example.HotelBooking.Repo.LoginRepo;
import com.example.HotelBooking.Service.PaymentService;
import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.stripe.exception.StripeException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.HashMap;
import java.util.UUID;


@RestController
@RequestMapping("/account")
@CrossOrigin
public class AccountController {
    @Value("${security.jwt.secret-key}")
    private  String jwtSecretKey;
    @Value("${security.jwt.issuer}")
    private  String jwtIssuer;
    @Autowired
    private LoginRepo loginRepo;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PaymentService paymentService;
    //method for register
    @PostMapping(path="/register")
    public ResponseEntity<Object> register(@Valid  @RequestBody SignUpDto signUpDto , BindingResult result)
    {
        if(result.hasErrors())
        {
            var errorsList =result.getAllErrors();
            var errorsMap =new HashMap<String,String>();
            for(int i=0; i<errorsList.size(); i++)
            {
                var error=(FieldError)errorsList.get(i);
                errorsMap.put(error.getField(),error.getDefaultMessage());
            }
            return  ResponseEntity.badRequest().body(errorsMap);
        }
        var bCryptEncoder =new BCryptPasswordEncoder();

        Login login =new Login();
        login.setLoginname(signUpDto.getLoginname());
        login.setEmail(signUpDto.getEmail());
        try {
            login.setCustomer_id(paymentService.createCustomer(signUpDto.getEmail(), signUpDto.getLoginname()));
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
        login.setPassword(bCryptEncoder.encode(signUpDto.getPassword()));
        try {
            var otherUser =loginRepo.findByEmail(signUpDto.getEmail());
            if(otherUser !=null)
            {
                return ResponseEntity.badRequest().body("Email address already used");
            }
            loginRepo.save(login);
            String jwtToken =createJWTToken((login));

            var response =new HashMap<String,Object>();
            response.put("token",jwtToken);
            response.put("user",login);
            return ResponseEntity.ok(response);
        }catch (Exception ex)
        {
            ex.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Error");
    }

     //method for Login
    @PostMapping(path="/login")
    public ResponseEntity<Object> login(@Valid @RequestBody SignInDto signInDto ,BindingResult result)
    {
        if(result.hasErrors())
        {
            var errorsList =result.getAllErrors();
            var errorsMap =new HashMap<String,String>();
            for(int i=0; i<errorsList.size(); i++)
            {
                var error=(FieldError)errorsList.get(i);
                errorsMap.put(error.getField(),error.getDefaultMessage());
            }
            return  ResponseEntity.badRequest().body(errorsMap);
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            signInDto.getEmail(),
                            signInDto.getPassword()
                    )

            );
            Login login=loginRepo.findByEmail(signInDto.getEmail());
            String jwtToken =createJWTToken(login);

            var response =new HashMap<String,Object>();
            response.put("token",jwtToken);
            response.put("user",login);
            return ResponseEntity.ok(response);
        }catch (Exception ex)
        {
            ex.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Incorrect username or password");

    }
    //method for get authenticate user
    @GetMapping(path="/profile")
    public ResponseEntity<Object> profile(Authentication auth) {
        var response = new HashMap<String, Object>();
        response.put("Username", auth.getName());
        response.put("Authorities", auth.getAuthorities());

        // Fetch the user using the email
        var user = loginRepo.findByEmail(auth.getName());

        response.put("User",user);

        return ResponseEntity.ok(response);
    }


    public String createJWTToken(Login login)
    {
        Instant now=Instant.now();
        JwtClaimsSet claims=JwtClaimsSet.builder()
                .issuer(jwtIssuer)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(24*3600))
                .subject(login.getEmail())
                .build();
        var encoder = new NimbusJwtEncoder(
                new ImmutableSecret<>(jwtSecretKey.getBytes()));
         var params = JwtEncoderParameters.from(
                 JwsHeader.with(MacAlgorithm.HS256).build(),claims);

         return encoder.encode(params).getTokenValue();
    }
    // Forgot password endpoint
    @PostMapping("/forgot-password")
    public ResponseEntity<Object> forgotPassword(@Valid @RequestBody SignInDto signInDto) {
        Login user = loginRepo.findByEmail(signInDto.getEmail());

        if (user != null) {
            // Generate a reset token
            String resetToken = UUID.randomUUID().toString();
            user.setResetPasswordToken(resetToken);
            user.setTokenCreationTime(Instant.now());

            loginRepo.save(user);

            // Return the reset token in the response
            String resetTokenResponse = resetToken;

            var response = new HashMap<String, Object>();
            response.put("message", "Password reset token generated.");
            response.put("resetTokenResponse", resetTokenResponse);  // Return reset token

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body("Email address not found.");
        }
    }
        // Reset password endpoint
        @PostMapping("/reset-password")
        public ResponseEntity<Object> resetPassword(@RequestBody HashMap<String, String> request) {
            String token = request.get("token");
            String newPassword = request.get("newPassword");

            // Find user by reset token
            Login user = loginRepo.findByResetPasswordToken(token);

            if (user != null) {
                // Check if the token is expired
                Instant tokenCreationTime = user.getTokenCreationTime();
                if (tokenCreationTime != null && tokenCreationTime.plusSeconds(86400).isBefore(Instant.now())) {
                    return ResponseEntity.badRequest().body("Token has expired. Please request a new reset link.");
                }

                // Update the user's password
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                user.setPassword(encoder.encode(newPassword));

                // Clear the reset token and token creation time
                user.setResetPasswordToken(null);
                user.setTokenCreationTime(null);

                // Save the updated user information
                loginRepo.save(user);

                return ResponseEntity.ok("Password has been reset successfully.");
            } else {
                return ResponseEntity.badRequest().body("Invalid reset token.");
            }
        }
    }

