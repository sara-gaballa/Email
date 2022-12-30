package com.example.email.mailmanager;

import com.example.email.model.Email;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

public interface MailManager {//TODO: write email
    // TODO : get folders on sign in

    // get all emails from inbox folder
    //public List<Email> getAllMails(User user) throws IOException;

    // get all emails in specific folder
    List<Email> getAllMails(String path) throws IOException;

    // Check: Queue -> Array
    Email getMail(String path, String name) throws IOException;

    void addMail(String path, String fileName, Email email) throws IOException;

    // TODO : add ID
    void deleteMails(String userFolder, String folder, List<String> ids);

    void moveMails(String fromPath, String toPath, List<String> ids);

    //void setCurrentFolder(String currentFolder);

    //String getCurrentFolder();
    List<Email> getCurrentEmails();

    void setCurrentEmails(List<Email> emails);

    void updateTrash(String userFolder) throws IOException, ParseException;
}
