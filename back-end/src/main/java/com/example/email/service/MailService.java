package com.example.email.service;

import com.example.email.model.Email;
import com.example.email.model.EmailKeys;
import com.example.email.model.User;
import com.example.email.service.mailmanager.FileAdapter;
import com.example.email.service.mailmanager.FileManager;
import com.example.email.service.mailmanager.FoldersName;
import com.example.email.service.mailmanager.MailManager;
import com.example.email.service.utilities.MailUtility;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class MailService {
    MailManager mailManager = new FileAdapter();

    MailUtility utility = new MailUtility();


    // sign in / send / add folder / rename folder/ delete folder/ delete mails/ get all mails / move mails
    public List<Email> getAllMails(User user, String folder) throws IOException {
        FileManager.setCurrentFolder(folder);
        System.out.println(user.getFolder().concat("/").concat(folder));
        mailManager.getAllMails(user.getFolder().concat("/").concat(folder));
        List<Email> emails = this.sort(EmailKeys.DATE);
        Collections.reverse(emails);
        mailManager.setCurrentEmails(emails);
        return emails;// return emails sorted by date from newest to oldest
    }

    public Email sendMail(Email email, Queue<String> toEmail) throws IOException {
        String id = UUID.randomUUID().toString();
        email.setId(id);
        mailManager.addMail(email.getFrom() + "/" + FoldersName.SENT, id, email);
        for (String to : toEmail) {
            mailManager.addMail(to + "/" + FoldersName.INBOX, id, email);
        }
        return email;
    }

    public Email saveDraft(Email email) throws IOException {
        String id = UUID.randomUUID().toString();
        email.setId(id);
        mailManager.addMail(email.getFrom() + "/" + FoldersName.DRAFT, id, email);
        return email;
    }

    public void deleteMails(User user, String folder, List<String> ids) {
        mailManager.deleteMails(user.getFolder(), folder, ids);
    }

    public void moveMails(User user, String fromFolder, String toFolder, List<String> ids) {
        String fromPath = user.getFolder() + "/" + fromFolder;
        String toPath = user.getFolder() + "/" + toFolder;
        mailManager.moveMails(fromPath, toPath, ids);
    }

    public void openAttachment(String name) throws IOException {
        mailManager.openAttachment(name);
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


    public List<Email> sort(String attribute) {
        return this.utility.sort(attribute, mailManager.getCurrentEmails());
    }

    public PriorityQueue<Email> sortByPriority() {
        return this.utility.sortByPriority(mailManager.getCurrentEmails());
    }

    public void updateTrash(User user) throws IOException, ParseException {
        List<Email> trashEmails = mailManager.getAllMails(user.getFolder() + "\\" + FoldersName.TRASH);
        List<String> deletedIds = new ArrayList<>();
        for (Email email : trashEmails) {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date d1 = new SimpleDateFormat("dd-MM-yyyy").parse(formatter.format(new Date()));
            Date d2 = new SimpleDateFormat("dd-MM-yyyy").parse(email.getDate());
            long diff = d1.getTime() - d2.getTime();
            System.out.println(diff);
            if (diff / (1000 * 60 * 60 * 24) > 30) {
                deletedIds.add(email.getId());
            }
        }
        this.mailManager.updateTrash(user.getFolder() + "\\" + FoldersName.TRASH, deletedIds);
    }

}
