package com.example.email.service;

import com.example.email.mailmanager.FileAdapter;
import com.example.email.mailmanager.FileManager;
import com.example.email.mailmanager.FoldersName;
import com.example.email.mailmanager.MailManager;
import com.example.email.model.Email;
import com.example.email.model.User;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Queue;
import java.util.UUID;

@Service
public class MailService {
    MailManager mailManager = new FileAdapter();

    // sign in / send / add folder / rename folder/ delete folder/ delete mails/ get all mails / move mails
    public List<Email> getAllMails(User user, String folder) throws IOException {
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

}
