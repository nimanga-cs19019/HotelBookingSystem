package com.example.HotelBooking.Config;
import com.example.HotelBooking.Service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${security.jwt.secret-key}")
    private  String jwtSecretKey;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/bookingRoom").permitAll()
                        .requestMatchers("/bookingRoom/save").permitAll()
                        .requestMatchers("/bookingRoom/fetch").permitAll()
                        .requestMatchers("/bookingRoom/fetchAll").permitAll()
                        .requestMatchers("/bookingRoom/latest").permitAll()
                        .requestMatchers("/bookingRoom/{id}/status").permitAll()
                        .requestMatchers("/bookingRoom/check-availability").permitAll()
                        .requestMatchers("/api/v1/login/**").permitAll()
                        .requestMatchers("/api/rooms/**").permitAll()
                        .requestMatchers("/api/offers/**").permitAll()
                        .requestMatchers("/message/**").permitAll()
                        .requestMatchers("/account").permitAll()
                        .requestMatchers("/account/register").permitAll()
                        .requestMatchers("/account/login").permitAll()
                        .requestMatchers("/reviews").permitAll()
                        .requestMatchers("/reviews/save").permitAll()
                        .requestMatchers("/reviews/fetch").permitAll()
                        .requestMatchers("/account/forgot-password").permitAll()
                        .requestMatchers("/account/reset-password").permitAll()
                        .requestMatchers("/api/payment/create").permitAll()
                        .anyRequest().authenticated()
                )
               .oauth2ResourceServer(oauth2->oauth2.jwt(Customizer.withDefaults()))
               .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Stateless sessions

        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder()
    {
        var secretKey=new SecretKeySpec(jwtSecretKey.getBytes(),"");
        return NimbusJwtDecoder.withSecretKey(secretKey)
                .macAlgorithm(MacAlgorithm.HS256).build();
    }
    @Bean
    public AuthenticationManager authenticationManager(UserService userService) {
        DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
        provider.setUserDetailsService(userService);
        provider.setPasswordEncoder(new BCryptPasswordEncoder());
        return new ProviderManager(provider);
    }

}
