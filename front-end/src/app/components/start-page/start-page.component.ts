import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private loggingService: LoggingService) { }

  //Should be false by default and set to true by back
  private valid = true

  ngOnInit(): void {}

  signUp(firstName: string, lastName: string, email: string, password: string) { this.loggingService.signUp(new User(firstName, lastName, email, password)) }

  signIn(email: string, password: string) { this.loggingService.signIn(email, password) }

}
