import { Component, OnInit } from '@angular/core';
import { EmailHttpService } from 'src/app/services/http.service';
import { DraftEmail } from 'src/app/model/DraftEmail';
import { Email } from 'src/app/model/Email';
import { Folder } from 'src/app/model/folder'
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.css']
})

export class ComposeEmailComponent implements OnInit {

  private sentEmail: DraftEmail = new DraftEmail('rowaina;dkfvkdv', '', '', '', '', '', '', [])
  private folders: Folder[]
  private draftFolder: Folder
  private email:Email;
  date:any;

  constructor(private httpService: EmailHttpService, private emailService: EmailService) {
    this.folders = emailService.getFolders()
    this.draftFolder = this.folders[3]
    this.draftFolder.addEmail(this.sentEmail)
  }

  ngOnInit(): void {}

  changeTo(to: any) { this.sentEmail.setTo(to.target.value); }

  changeSubject(subject: any) { this.sentEmail.setSubject(subject.target.value) }

  changeBody(body: any) { this.sentEmail.setBody(body.target.value) }

  composeEmail(operation: string) { //facade
    let to = document.getElementById("to") as HTMLInputElement;
    let from = this.emailService.getUser().getEmail();
    let priority = document.getElementById("priority") as HTMLInputElement;
    let sentDate = new Date();
    let time = sentDate.getHours()+":"+sentDate.getMinutes()+":"+sentDate.getSeconds();
    let subject = document.getElementById("subject") as HTMLInputElement;
    let body = document.getElementById("body") as HTMLInputElement;
    let attach = document.getElementById("attachments") as HTMLInputElement; //cant send more than one?
    let attachments: string[] = new Array(attach.files.length)
    for(let i=0;i<attach.files.length;i++){
      attachments[i]=(attach.files[i].name)
    }
    console.log(attachments)
    this.email = new Email(from, to.value, sentDate.toLocaleDateString(), time,subject.value, body.value, priority.value, attachments)
    if(operation==='send'){
    this.httpService.sendEmail(this.email, [to.value]);
    }
    else if(operation==='draft'){
      // this.httpService.sendEmail(this.email, [to.value]);   >> Draft
    }

  }


//ToDO make the draft if it is not sent




}
