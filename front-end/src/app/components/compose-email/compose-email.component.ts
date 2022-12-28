import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/model/Email';
import { EMailDataService } from 'src/app/services/email-data.service';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.css']
})
export class ComposeEmailComponent implements OnInit {

  // constructor(private emailDataService: EMailDataService) { }

  ngOnInit(): void {
  }

  // getOpenedEmail(): Email { return this.emailDataService.getOpenedEmail() }

}
