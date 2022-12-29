import { Component, Input } from '@angular/core';
import { Email } from './model/Email';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Email';

  @Input() currentEmails: Email[]

}
