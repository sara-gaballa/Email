import { Component, OnInit } from '@angular/core';
import { DraftEmail } from 'src/app/model/DraftEmail';
import { Folder } from 'src/app/model/Folder';
import { EmailHttpService } from 'src/app/controller/EmailFacade';
import {Email} from "../../model/Email";

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.css']
})

export class ComposeEmailComponent implements OnInit {

  private composingEmail: DraftEmail
  private folders: Folder[]
  private draftFolder: Folder
  private email:Email;
  date:any;
  constructor(private httpService: EmailHttpService) {
    this.date=new Date().toLocaleString();
  }



  ngOnInit(): void {}

  changeTo(to: string) { this.composingEmail.setTo(to); console.log(to) }

  changeSubject(subject: string) { this.composingEmail.setSubject(subject) }

  changeBody(body: string) { this.composingEmail.setBody(body) }

  sendComposedEmail(to: string, subject: string, emailBody: string) {
    //remove from draft here and back
    this.draftFolder.removeEmail(this.composingEmail)
    this.folders[1].addEmail(this.composingEmail)
  }
  composeEmail() { //facade
    let to = document.getElementById("to") as HTMLInputElement;
    let from = this.httpService.getUser().getEmail();
    let priority = document.getElementById("priority") as HTMLInputElement;
    let sentDate = new Date();
    let time=sentDate.getHours()+":"+sentDate.getMinutes()+":"+sentDate.getSeconds();
    let subject = document.getElementById("subject") as HTMLInputElement;
    let body = document.getElementById("body") as HTMLInputElement;
    // let attachments = document.getElementById("attachments") as HTMLInputElement; //cant send more than one?
    this.email= new Email(from, to.value,sentDate.toLocaleDateString(),time,subject.value,body.value,priority.value)
    this.httpService.sendEmail(this.email);
  }






}
