import { Component } from '@angular/core';
import { Email } from 'src/app/model/Email';
import { EmailService } from 'src/app/services/email.service';
import {Router} from "@angular/router";
import { DraftEmail } from 'src/app/model/DraftEmail';
import { EmailHttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css']
})
export class MailBoxComponent {

  constructor(private emailService: EmailService, private  route:Router, private httpService: EmailHttpService) { }

  getOpenedEmail(): Email {
    if(this.emailService.getOpenedEmail() instanceof DraftEmail) { this.route.navigate(["/compose"]) }
    return this.emailService.getOpenedEmail()
  }

  run(file:string){
    this.httpService.openAttachment(file).subscribe();
  }
}
