import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {

  @Input() subject: any;
  @Input() date: any;
  @Input() time: any;
  @Output() clicked = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

}
