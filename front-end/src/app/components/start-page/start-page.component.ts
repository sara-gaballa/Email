import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

  //Should be false by default and set to true by back
  private valid = true

  ngOnInit(): void {}

  signUp(username: string, email: string, password: string) { this.navigationService.signUp(username, email, password) }

  signIn(email: string, password: string) { this.navigationService.signIn(email, password) }

}
