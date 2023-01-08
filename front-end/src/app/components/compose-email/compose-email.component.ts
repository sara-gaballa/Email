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

  private sentEmail: DraftEmail = new DraftEmail('', '', [], '', '', '', '', '', [])
  private folders: Folder[]
  private draftFolder: Folder
  private email: Email;
  date: any;
  public f: string[]=["sara","nancy"]

  constructor(private httpService: EmailHttpService, private emailService: EmailService) {
    this.folders = emailService.getFolders()
    this.draftFolder = this.folders[3]
    this.draftFolder.addEmail(this.sentEmail)
  }

  ngOnInit(): void {
    if (this.emailService.getCurrentFolder()=="draft"){
      let to = document.getElementById("to") as HTMLInputElement;
      let priority = document.getElementById("priority") as HTMLInputElement;
      let subject = document.getElementById("subject") as HTMLInputElement;
      let body = document.getElementById("body") as HTMLInputElement;
      subject.value=this.emailService.getOpenedEmail().getSubject()
      body.value=this.emailService.getOpenedEmail().getBody()
      let to_arr = this.emailService.getOpenedEmail().getTo();
      to.value = to_arr.join(", ")
      priority.value=this.emailService.getOpenedEmail().getPriority();
      let attach = document.getElementById("attachments") as HTMLInputElement;
      let attachments=this.emailService.getOpenedEmail().getAttachments()
      for(let i=0;i < attachments.length;i++){
        attach[i]=attachments[i];
      }
    }
  }

  multipleTo(){
    let to = document.getElementById("to") as HTMLInputElement;
    to.value=to.value+", ";
  }

  getatt():string[]{
    let attach = document.getElementById("attachments") as HTMLInputElement;
    let attachments: string[] = new Array(attach.files.length)
    for(let i=0;i<attach.files.length;i++){ attachments[i]=(attach.files[i].name) }
    return attachments;
  }

  run(file:string){ this.httpService.openAttachment(file).subscribe(); }

  composeEmail(operation: string) { //facade
    let to = document.getElementById("to") as HTMLInputElement;
    console.log(this.emailService.getUser())
    let from = this.emailService.getUser().getEmail();
    let priority = document.getElementById("priority") as HTMLInputElement;
    let sentDate = new Date();
    let time = sentDate.getHours()+":"+sentDate.getMinutes()+":"+sentDate.getSeconds();
    let subject = document.getElementById("subject") as HTMLInputElement;
    let body = document.getElementById("body") as HTMLInputElement;
    let attach = document.getElementById("attachments") as HTMLInputElement;
    let attachments: string[] = new Array(attach.files.length)
    for(let i=0;i < attach.files.length;i++){ attachments[i]=(attach.files[i].name) }
    let to_arr=to.value.split(', ');
    this.email = new Email('', from, to_arr, sentDate.toLocaleDateString(), time,subject.value, body.value, priority.value, attachments)
    if(operation==='send'){
      if(this.emailService.getCurrentFolder() == 'draft') {
        this.httpService.sendEmail(this.email).subscribe( res=>{
          let id = []
          id.push(this.email.getId())
          this.email.setID(res["id"]);
          console.log(res)
        })
      } else {
        this.httpService.sendEmail(this.email).subscribe( res=>{
          this.email.setID(res["id"]);
          console.log(res)
        })
      }
    }
    else if(operation==='draft'){
      this.httpService.saveDraft(this.email).subscribe( res=>{
        this.email.setID(res["id"]);
        console.log(res)
      })
    }
  }
}
