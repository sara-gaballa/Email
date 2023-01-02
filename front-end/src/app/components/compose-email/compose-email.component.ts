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

  private sentEmail: DraftEmail = new DraftEmail('', 'rowaina;dkfvkdv', [], '', '', '', '', '', [])
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
  multipleTo(){
    let to = document.getElementById("to") as HTMLInputElement;
    to.value=to.value+", ";
  }

  composeEmail(operation: string) { //facade
    let to = document.getElementById("to") as HTMLInputElement;
    let from = this.emailService.getUser().getEmail();
    let priority = document.getElementById("priority") as HTMLInputElement;
    let sentDate = new Date();
    let time = sentDate.getHours()+":"+sentDate.getMinutes()+":"+sentDate.getSeconds();
    let subject = document.getElementById("subject") as HTMLInputElement;
    let body = document.getElementById("body") as HTMLInputElement;
    let attach = document.getElementById("attachments") as HTMLInputElement;
    let attachments: string[] = new Array(attach.files.length)
    for(let i=0;i<attach.files.length;i++){
      attachments[i]=(attach.files[i].name)
    }
    let to_arr=to.value.split(', ');
    console.log(to_arr)
    this.email = new Email('', from, to_arr, sentDate.toLocaleDateString(), time,subject.value, body.value, priority.value, attachments)
    if(operation==='send'){
      let index = this.emailService.names.indexOf('sent')
      console.log(this.email)
      this.folders[index].addEmail(this.email)
      //TODO send to back
    }
    else if(operation==='draft'){
      let index = this.emailService.names.indexOf('draft')
      this.folders[index].addEmail(this.email)
      //TODO send to back
    }

  }
}
