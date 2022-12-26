package com.example.email.mailmanager;

import com.example.email.model.Email;
import com.example.email.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

// draft class
public class DataManager {
    private final static String parentFolder = "parent";
    private static ObjectMapper objectMapper = new ObjectMapper();


    public List<Email> getAllMails(User user) throws IOException {
        List<Email> allMail = new ArrayList<>();
        File userFolder = new File(parentFolder + "\\" + user.getFolder());
        for (File folder : userFolder.listFiles()) {
            for (File file : folder.listFiles()) {
                Email email = objectMapper.readValue(file, Email.class);
                allMail.add(email);
            }
        }
        return allMail;
    }

    public List<Email> getMails(User user, String folder) throws IOException {
        List<Email> mails = new ArrayList<>();
        File mailFolder = new File(parentFolder + "\\" + user.getFolder() + "\\" + folder);
        for (File file : mailFolder.listFiles()) {
            Email email = objectMapper.readValue(file, Email.class);
            mails.add(email);
        }
        return mails;
    }

    public boolean sendMail(User user, Email email, Queue<String> toEmail) {
        try {
            addMail(user.getFolder(), email, FoldersName.SENT);
            for (String emailAddress : toEmail) {
                addMail(emailAddress, email, FoldersName.INBOX);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean addMail(String userFolder, Email email, String folder) throws IOException {
        File mailFolder = new File(parentFolder + "\\" + userFolder + "\\" + folder);
        //configure objectMapper for pretty input
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);

        //write email object to json file
        objectMapper.writeValue(new File(mailFolder + "\\" + email.getId() + ".json"), email);
        return true;
    }

    public boolean deleteMails(String userFolder, String folder, String[] ids) throws IOException {
        File mailFolder = new File(parentFolder + "\\" + userFolder + "\\" + folder);
        for (String id : ids) {
            for (File mail : mailFolder.listFiles()) {
                if (mail.getName().equals(id + ".json")) {
                    Email email = objectMapper.readValue(mail, Email.class);
                    addMail(userFolder, email, FoldersName.TRASH);
                    if (!mail.delete())
                        return false;
                }
            }
        }
        return true;
    }

    public boolean moveMails(String fromFolder, String toFolder, String[] ids) {
        return false;
    }
}
