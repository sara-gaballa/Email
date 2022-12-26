import { Component, OnInit } from '@angular/core';
import { MailboxComponent } from '../mailbox/mailbox.component';

@Component({
  selector: 'app-mail-area',
  templateUrl: './mail-area.component.html',
  styleUrls: ['./mail-area.component.css']
})
export class MailAreaComponent  {

  shownMails: MailboxComponent[] = []

  constructor() { }

}
