import { Component, OnInit } from '@angular/core';
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

  signUp(username: string, email: string, password: string) { this.loggingService.signUp(username, email, password) }

  signIn(email: string, password: string) { this.loggingService.signIn(email, password) }

}
