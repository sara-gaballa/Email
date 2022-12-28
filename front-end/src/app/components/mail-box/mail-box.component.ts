import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/model/Email';
import { EMailDataService } from 'src/app/services/email-data.service';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css']
})

export class MailBoxComponent implements OnInit {

  constructor(private emailDataService: EMailDataService) { }

  ngOnInit(): void {
  }

  getOpenedEmail(): Email { return this.emailDataService.getOpenedEmail() }

}
