import { Component, OnInit } from '@angular/core';
import { EmailHttpService } from 'src/app/controller/EmailFacade';
import { DraftEmail } from 'src/app/model/DraftEmail';
import { Email } from 'src/app/model/Email';
import { Folder } from 'src/app/model/folder'
import { FolderManagerService } from 'src/app/services/folder-manager.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private httpService: EmailHttpService, private userService: UserService, folderManager: FolderManagerService) {
    this.folders = folderManager.getFolders()
    this.draftFolder = this.folders[3]
    this.draftFolder.addEmail(this.composingEmail)
  }



  ngOnInit(): void {}

  changeTo(to: string) { this.composingEmail.setTo(to); console.log(to) }

  changeSubject(subject: string) { this.composingEmail.setSubject(subject) }

  changeBody(body: string) { this.composingEmail.setBody(body) }

  sendComposedEmail(to: string, subject: string, emailBody: string) {
    //remove from draft here and back
    this.draftFolder.removeEmail(this.composingEmail)
    this.folders[1].addEmail(this.composingEmail)
    this.httpService.sendEmail(new Email('0', this.userService.getUser().getEmail(), to, '25/8/2002', '5:04', subject, emailBody, []))
  }
  composeEmail() { //facade
    let to = document.getElementById("to") as HTMLInputElement;
    let from = this.httpService.getUser().getEmail();
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
    this.httpService.sendEmail(this.email);
  }

//ToDO make the draft if it is not sent




}
