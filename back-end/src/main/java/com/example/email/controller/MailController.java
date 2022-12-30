package com.example.email.controller;

import com.example.email.model.Email;
import com.example.email.model.User;
import com.example.email.service.Logging;
import com.example.email.service.LoggingProxy;
import com.example.email.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

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
    public User signIn(@RequestParam String email, @RequestParam String password) {
        try {
            User user = logging.signIn(email, password);
            service.updateTrash(user); // update trash by deleting emails exceeding 30 days
            return user;
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/getMails/{folder}/{direction}")
    public List<Email> getEmails(@PathVariable("folder") String folder,
                                 @PathVariable("direction") String direction) {
        return service.pageNavigate(folder, direction);
    }

    @GetMapping("/getAll")
    public List<Email> getEmails(@RequestParam String folder) throws IOException {
        return this.service.getAllMails(logging.getCurrentUser(), folder);
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

    @PutMapping("/renameFolder")
    public void renameFolder(@RequestParam String oldName, @RequestParam String newName) {
        try {
            service.renameFolder(logging.getCurrentUser(), oldName, newName);
            System.out.println(logging.getCurrentUser().getFirstName() + " has renamed " + oldName + " to " + newName + " folder.");
        } catch (Exception e) {
            System.out.println("something happened");
        }
    }

    @DeleteMapping("/deleteFolder")
    public void deleteFolder(@RequestParam String name) {
        try {
            service.deleteFolder(logging.getCurrentUser(), name);
            System.out.println(logging.getCurrentUser().getFirstName() + " has deleted " + name + " folder.");
        } catch (Exception e) {
            System.out.println("something happened");
        }
    }

    @PostMapping("/send")
    public void send(@RequestBody Email email) {
        Queue<String> q = new PriorityQueue<>();
        q.addAll(Arrays.asList(email.getTo()));

        try {
            this.service.sendMail(logging.getCurrentUser(), email, q);
        } catch (Exception e) {
        }
        // System.out.println(mockUser.getEmail());
    }

    @DeleteMapping("/delete")
    public void deleteMail(@RequestParam String folder, @RequestParam String id) {
        List<String> ids = new ArrayList<>();
        ids.add(id);
        this.service.deleteMails(logging.getCurrentUser(), folder, ids);
    }

    @GetMapping("/search")
    public List<Email> search(@RequestParam String attributes, @RequestParam String value) {
        return this.service.search(new String[]{attributes}, value);
    }

    @GetMapping("/sort")
    public List<Email> sort(@RequestParam String attribute) {
        return this.service.sort(attribute);
    }

    @GetMapping("/priority")
    public PriorityQueue<Email> sortByPriority() {
        return this.service.sortByPriority();
    }

    @PutMapping("/move")
    public void move(@RequestParam String from, @RequestParam String to,
                     @RequestParam List<String> ids) {
        this.service.moveMails(logging.getCurrentUser(), from, to, ids);
    }

    @PostMapping(value = "/filter/{criteria}/{value}", consumes = {"application/json"})
    public List<Email> filter(@PathVariable("criteria") String criteria,
                              @PathVariable("value") String value) {
        return this.service.filter(criteria, value);
    }

}
