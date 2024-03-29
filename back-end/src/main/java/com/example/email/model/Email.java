package com.example.email.model;

public class Email implements Comparable<Email> {
    private String id;
    private String from;
    private String[] to;// TODO : convert 'to' to queue or list
    private String date;
    private String time;
    private String subject;
    private String body;
    private Priority priority;
    private String[] attachments;

    public Email(String from, String[] to, String date, String time, String subject,
                 String body, Priority priority, String[] attachments) {
        this.from = from;
        this.to = to;
        this.date = date;
        this.time = time;
        this.subject = subject;
        this.body = body;
        this.priority = priority;
        this.attachments = attachments;
    }

    public Email() {

    }

    public String getId() {
        return id;
    }

    // set id only one time
    public void setId(String id) {
            this.id = id;
    }

    public String getFrom() {
        return from;
    }

    public String[] getTo() {
        return to;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public String getSubject() {
        return subject;
    }

    public String getBody() {
        return body;
    }

    public Priority getPriority() {
        return priority;
    }

    public String[] getAttachments() {
        return attachments;
    }

    public boolean search(String[] attributes, String value) {
        boolean found = false;
        for (String attribute : attributes) {
            switch (attribute) {
                case EmailKeys.TO:
                    for (String receiver : this.to)
                        found |= receiver.toLowerCase().contains(value.toLowerCase());
                    break;
                case EmailKeys.FROM:
                    found = this.from.toLowerCase().contains(value.toLowerCase());
                    break;
                case EmailKeys.DATE:
                    found = this.date.toLowerCase().contains(value.toLowerCase());
                    break;
                case EmailKeys.TIME:
                    found = this.time.toLowerCase().contains(value.toLowerCase());
                    break;
                case EmailKeys.SUBJECT:
                    found = this.subject.toLowerCase().contains(value.toLowerCase());
                    break;
                case EmailKeys.BODY:
                    found = this.body.toLowerCase().contains(value.toLowerCase());
                    break;
                case EmailKeys.PRIORITY:
                    found = this.priority.name().toLowerCase().contains(value.toLowerCase());
                case EmailKeys.ATTACHMENTS:
                    for (String attachment : attachments)
                        found |= attachment.toLowerCase().contains(value.toLowerCase());
            }
            if (found)
                return true;
        }
        return false;
    }

    public int compareTo(Email o) {
        return 0;
    }
}
