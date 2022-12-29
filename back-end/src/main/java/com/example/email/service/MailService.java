package com.example.email.service;

import com.example.email.mailmanager.FileAdapter;
import com.example.email.mailmanager.FileManager;
import com.example.email.mailmanager.FoldersName;
import com.example.email.mailmanager.MailManager;
import com.example.email.mailpartitioning.CriteriaSender;
import com.example.email.mailpartitioning.CriteriaSubject;
import com.example.email.mailpartitioning.EmailsIterator;
import com.example.email.mailpartitioning.ICriteria;
import com.example.email.model.Email;
import com.example.email.model.User;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class MailService {
    MailManager mailManager = new FileAdapter();

    ICriteria cretiriaSubject = new CriteriaSubject();

    ICriteria cretiriaSender = new CriteriaSender();

    EmailsIterator iterator = new EmailsIterator();


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
        return this.mailManager.searchMails(attributes, value);
    }

    public List<Email> filter(String criteria, String value) {
        List<Email> emails = new ArrayList<>();
        if (criteria.equalsIgnoreCase("subject")) {
            iterator.setAllEmails(cretiriaSubject.meetCriteria(mailManager.getCurrentEmails(), value));
            return iterator.getCurrentPage();
        } else if (criteria.equalsIgnoreCase("sender")) {
            iterator.setAllEmails(cretiriaSender.meetCriteria(mailManager.getCurrentEmails(), value));
            return iterator.getCurrentPage();
        }
        return null;
    }

    public List<Email> pageNavigate(String folder, String direction) {
<<<<<<< Updated upstream
        if (iterator.hasNextPage() && direction.equalsIgnoreCase("next")) {
            System.out.println("next");
            return iterator.getNextPage();
        } else if (iterator.hasPreviousPage() && direction.equalsIgnoreCase(("Previous"))) {
            System.out.println("previous");
            return iterator.getPreviousPage();
        } else {
            return iterator.getCurrentPage();
        }
=======
//        if(iterator.hasNextPage() && direction.equalsIgnoreCase("next")) {
//            System.out.println("next");
//            return iterator.getNextPage();
//        } else if(iterator.hasPreviousPage() && direction.equalsIgnoreCase(("Previous"))) {
//            System.out.println("previous");
//            return iterator.getPreviousPage();
//        } else{
//            return iterator.getCurrentPage();
//        }
        return this.mailManager.getCurrentEmails();
>>>>>>> Stashed changes
    }

    public List<Email> sort(String attribute) {
        return mailManager.sort(attribute);
    }

    public PriorityQueue<Email> sortByPriority() {
        return mailManager.sortByPriority();
    }

}
