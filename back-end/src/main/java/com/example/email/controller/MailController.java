package com.example.email.controller;

import com.example.email.model.User;
import com.example.email.service.Logging;
import com.example.email.service.LoggingProxy;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("https://localhost:4200")
@RequestMapping("/mail")
public class MailController {
    Logging logging = new LoggingProxy();

    @RequestMapping("/signUp")
    public void signUp() {
        User mockUser = new User("Mariam", "Hossam", "mariam@yahoo.com", "mariam123");
        User mockUser2 = new User("Menna", "Hossam", "menna@yahoo.com", "menna123");
        try {
            logging.signUp(mockUser);
            logging.signUp(mockUser2);
        } catch (Exception e) {
        }
        System.out.println(mockUser.getEmail());
    }
}
