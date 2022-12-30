package com.example.email.service;

import com.example.email.mailmanager.FileAdapter;
import com.example.email.mailmanager.FileManager;
import com.example.email.mailmanager.FoldersName;
import com.example.email.mailmanager.MailManager;
import com.example.email.mailpartitioning.EmailsIterator;
import com.example.email.model.Email;
import com.example.email.model.User;
import com.example.email.utilities.MailUtility;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.UUID;

@Service
public class MailService {
    MailManager mailManager = new FileAdapter();

    EmailsIterator iterator = new EmailsIterator();

    MailUtility utility = new MailUtility();


    // sign in / send / add folder / rename folder/ delete folder/ delete mails/ get all mails / move mails
    public List<Email> getAllMails(User user, String folder) throws IOException {
        FileManager.setCurrentFolder(folder);
        iterator.setAllEmails(mailManager.getCurrentEmails());
        return mailManager.getAllMails(user.getFolder() + "/" + folder);
    }

    public void sendMail(User user, Email email, Queue<String> toEmail) throws IOException {
        String id = UUID.randomUUID().toString();
        email.setId(id);
        mailManager.addMail(user.getFolder() + "/" + FoldersName.SENT, id, email);
        for (String to : toEmail) {
            mailManager.addMail(to + "/" + FoldersName.INBOX, id, email);
        }

    }

    public void deleteMails(User user, String folder, String[] ids) {
        mailManager.deleteMails(user.getFolder() + "/" + folder, ids);
    }

    public void moveMails(User user, String fromFolder, String toFolder, String[] ids) {
        String fromPath = user.getFolder() + "/" + fromFolder;
        String toPath = user.getFolder() + "/" + toFolder;
        mailManager.moveMails(fromPath, toPath, ids);
    }

    public void addFolder(User user, String folderName) {
        FileManager.addFolder(user.getFolder() + "/" + folderName);
        user.addFolder(folderName);
    }

    public void renameFolder(User user, String oldName, String newName) {
        FileManager.renameFolder(user.getFolder() + "/" + oldName, user.getFolder() + "/" + newName);
    }

    public void deleteFolder(User user, String folderName) {
        FileManager.deleteFolder(user.getFolder() + "/" + folderName);
    }

    public List<Email> search(String[] attributes, String value) {
        return this.utility.searchMails(attributes, value, mailManager.getCurrentEmails());
    }

    public List<Email> filter(String criteria, String value) {
        return this.utility.filter(criteria, value, mailManager.getCurrentEmails());
    }

    public List<Email> pageNavigate(String folder, String direction) {
        return this.utility.pageNavigate(folder, direction);
    }

    public List<Email> sort(String attribute) {
        return this.utility.sort(attribute, mailManager.getCurrentEmails());
    }

    public PriorityQueue<Email> sortByPriority() {
        return this.utility.sortByPriority(mailManager.getCurrentEmails());
    }

}
