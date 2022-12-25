package com.example.email.service;

import com.example.email.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class LoggingService implements Logging {
    private List<User> accounts;

    public LoggingService() {
        accounts = new ArrayList<>();
    }

    @Override
    public void signUp(User user) throws IOException {
        accounts.add(user);
        System.out.println(Arrays.toString(accounts.toArray()));
        File mailFolder = new File(user.getEmail() + ".json");
        mailFolder.createNewFile();
        ObjectMapper objectMapper = new ObjectMapper();

        //configure objectMapper for pretty input
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);

        //write email object to json file
        objectMapper.writeValue(mailFolder, user);
    }

    @Override
    public List<String> signIn(String email, String password) {
        User user = findUser(email);
        return user.getUserFolders();
    }

    public User findUser(String email) {
        for (User account : accounts) {
            if (account.getEmail().equals(email))
                return account;
        }
        return null;
    }
}
