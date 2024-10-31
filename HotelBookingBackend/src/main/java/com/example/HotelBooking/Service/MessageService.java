package com.example.HotelBooking.Service;

import com.example.HotelBooking.Entity.Message;
import com.example.HotelBooking.Entity.Room;
import com.example.HotelBooking.Repo.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
    // New method for saving a room
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }
    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }
}
