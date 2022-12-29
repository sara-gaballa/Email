package com.example.email.mailmanager;

import com.example.email.model.Email;

import java.io.IOException;
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
    void deleteMails(String path, String[] ids);

    void moveMails(String fromPath, String toPath, String[] ids);

    //void setCurrentFolder(String currentFolder);

    //String getCurrentFolder();
    List<Email> searchMails(String[] attributes, String value);

    List<Email> getCurrentEmails();
}
