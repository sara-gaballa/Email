import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/model/Email';
import { EmailService } from 'src/app/services/email.service';
import * as http from "http";
import {EmailHttpService} from "../../services/http.service";
import { ComposeEmailComponent } from '../compose-email/compose-email.component';
import {Router} from "@angular/router";


@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css']
})

export class MailBoxComponent implements OnInit {

  constructor(private emailService: EmailService,private httpService: EmailHttpService, private  route:Router) { }

  ngOnInit(): void {

  }

  getOpenedEmail(): Email {
    if(this.emailService.getCurrentFolder() == "draft") {
      this.route.navigate(["/compose"])
    }
    return this.emailService.getOpenedEmail()
  }
  run(file:string){
    this.httpService.openAttachment(file).subscribe();
  }


}
