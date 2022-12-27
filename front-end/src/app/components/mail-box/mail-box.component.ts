import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css']
})

export class MailBoxComponent implements OnInit {
  ngOnInit(): void {}
  constructor() {
    
   }
  getSubject():string{
    return "Subject";
  }
  getSenderName():string{
    return "Nancy";
  }
  getSenderEmail():string{
    return "NancyHisham@galaxy.com";
  }
  getDate():string{
    return "12/27/2022"
  }
  getTo():string{
    return "SaraGaballah@galaxy.com"
  }
  getbody():string{
    return "body"
  }

}
