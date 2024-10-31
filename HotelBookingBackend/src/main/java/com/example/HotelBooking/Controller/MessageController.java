package com.example.HotelBooking.Controller;

import com.example.HotelBooking.Entity.Message;
import com.example.HotelBooking.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
@CrossOrigin
public class MessageController {
    @Autowired
    private MessageService messageService;
    //method for getting all messages
    @GetMapping("/fetch")
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    //method for saving a message
    @PostMapping("/save")
    public ResponseEntity<Message> saveMessage(@RequestBody Message message) {
        Message savedMessage = messageService.saveMessage(message);
        return ResponseEntity.ok(savedMessage);  // Return the saved message with HTTP 200 OK status
    }

}
