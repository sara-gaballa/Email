import { Component, OnInit } from '@angular/core';
import { EmailHttpService } from 'src/app/services/http.service';
import { User } from 'src/app/model/User';
import { EmailService } from 'src/app/services/email.service';
import { EmailComponent } from '../email/email.component';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private httpService: EmailHttpService, private emailService: EmailService) { }

  //Should be false by default and set to true by back
  private valid = true

  ngOnInit(): void {}

  signUp(firstName: string, lastName: string, email: string, password: string) {
    this.httpService.signUp(new User(firstName, lastName, email, password, [], [])).subscribe(() => {
      let user = new User(firstName, lastName, email, password, [], [])
      this.emailService.clear()
      this.emailService.setUser(user)
    })
  }

  signIn(email: string, password: string) {
    this.httpService.signIn(email, password).subscribe((user) => {
      let userr = new User(user['firstName'], user['lastName'], user['email'], user['password'], user['contacts'], user['userFolders'])
      this.emailService.setUser(userr)
      this.emailService.clear()
      let comp = new EmailComponent(this.httpService, this.emailService)
      comp.ngOnInit()
    })
  }

}
