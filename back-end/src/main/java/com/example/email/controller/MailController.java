package com.example.email.controller;

import com.example.email.model.Email;
import com.example.email.model.User;
import com.example.email.service.Logging;
import com.example.email.service.LoggingProxy;
import com.example.email.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.PriorityQueue;
import java.util.Queue;

@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/mail")
public class MailController {
    @Autowired
    MailService service = new MailService();
    Logging logging = new LoggingProxy();

    @PostMapping("/signUp")
    public void signUp(@RequestBody User user) {
        try {
            logging.signUp(user);
        } catch (Exception e) {
            System.out.println(user.getEmail());
        }
        System.out.println(user.getEmail());
    }

    @GetMapping("/signIn")
    public List<String> signIn(@RequestParam String email, @RequestParam String password) {
        try {
            return logging.signIn(email, password);
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/addFolder")
    public void addFolder(@RequestParam String name) {
        try {
            service.addFolder(logging.getCurrentUser(), name);
            System.out.println(logging.getCurrentUser().getFirstName() + " has added " + name + " folder.");
        } catch (Exception e) {
            System.out.println("something happened");
        }
    }

    @RequestMapping("/send")
    public void send() {
        User mockUser = new User("a", "b", "c", "d");
        Queue<String> q = new PriorityQueue<>();
        q.add("mariam@yahoo.com");
        Email email = new Email("menna@yahoo.com", "mariam@yahoo.com", "12/26/22", "8:31", "test",
                "did that arrive?", null, null);
        try {
            this.service.sendMail(mockUser, email, q);
        } catch (Exception e) {
        }
        // System.out.println(mockUser.getEmail());
    }

    @GetMapping("/search")
    public List<Email> search(@RequestParam String[] attributes, @RequestParam String value) {
        return this.service.search(attributes, value);
    }
    // sign in / send / add folder / rename folder/ delete folder/ delete mails/ get all mails / move mails

}
