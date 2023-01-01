import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/model/Email';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css']
})

export class MailBoxComponent implements OnInit {

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
  }

  getOpenedEmail(): Email {
    if(this.emailService.getCurrentFolder() === 'draft') {
    //TODO Draft
    }
    return this.emailService.getOpenedEmail()
  }

}
