package com.example.email.controller;

import com.example.email.model.Email;
import com.example.email.model.User;
import com.example.email.service.Logging;
import com.example.email.service.LoggingProxy;
import com.example.email.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.PriorityQueue;
import java.util.Queue;

@RestController
@CrossOrigin("https://localhost:4200")
@RequestMapping("/mail")
public class MailController {
    @Autowired
    MailService service = new MailService();
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

    @RequestMapping("/send")
    public void send() {
        User mockUser = logging.findUser("menna@yahoo.com");
        Queue<String> q = new PriorityQueue<>();
        q.add("mariam@yahoo.com");
        Email email = new Email("menna@yahoo.com", "mariam@yahoo.com", "12/26/22", "8:31", "test",
                "did that arrive?", null, null);
        try {
            this.service.sendMail(mockUser, email, q);
        } catch (Exception e) {
        }
        System.out.println(mockUser.getEmail());
    }
    // sign in / send / add folder / rename folder/ delete folder/ delete mails/ get all mails / move mails

}
