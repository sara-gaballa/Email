package com.example.email.controller;

import com.example.email.model.Contact;
import com.example.email.model.Email;
import com.example.email.model.User;
import com.example.email.service.ContactService;
import com.example.email.service.Logging;
import com.example.email.service.LoggingProxy;
import com.example.email.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Queue;

@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/mail")
public class MailController {
    @Autowired
    MailService service = new MailService();
    ContactService contactService = new ContactService();
    Logging logging = new LoggingProxy();

    public MailController() throws IOException {
    }

    @PostMapping("/signUp")
    public void signUp(@RequestBody User user) {
        try {
            logging.signUp(user);
        } catch (Exception e) {
            System.out.println("Email is taken");
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
            e.printStackTrace();
        }
        return null;
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
            this.service.sendMail(email, q);
        } catch (Exception e) {
        }
        // System.out.println(mockUser.getEmail());
    }

    @DeleteMapping("/delete")
    public void deleteMail(@RequestParam String folder, @RequestParam List<String> ids) {
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

    @PostMapping("/addContact")
    public void addContact(@RequestBody Contact contact) {
        this.contactService.addContact(logging.getCurrentUser(), contact);
    }

    @PutMapping("/editContact/{name}")
    public void editContact(@PathVariable("name") String name, @RequestBody Contact contact) {
        this.contactService.editContact(logging.getCurrentUser(), name, contact);
    }

    @DeleteMapping("/deleteContact/{name}")
    public void deleteContact(@PathVariable("name") String name) {
        this.contactService.deleteContact(logging.getCurrentUser(), name);
    }

    @RequestMapping("signOut")
    public void signOut() throws IOException {
        this.logging.signOut();
    }


}
