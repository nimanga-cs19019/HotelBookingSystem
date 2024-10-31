package com.example.HotelBooking.Repo;

import com.example.HotelBooking.Entity.BookingRoom;
import com.example.HotelBooking.Entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRoomRepository extends JpaRepository <BookingRoom,Long>{

    List<BookingRoom> findByLogin(Login login);
    // find the most recent booking
    BookingRoom findTopByLoginOrderByIdDesc(Login login);

    @Query("SELECT b FROM BookingRoom b WHERE b.room.id = :roomId AND b.status <> 'canceled' AND " +
            "(b.checkInDate < :checkOutDate AND b.checkOutDate > :checkInDate)")

    List<BookingRoom> findOverlappingBookings(@Param("roomId") Long roomId,
                                              @Param("checkInDate") LocalDate checkInDate,
                                              @Param("checkOutDate") LocalDate checkOutDate);

}
