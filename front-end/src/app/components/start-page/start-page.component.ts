import { Component, OnInit } from '@angular/core';
import { EmailHttpService } from 'src/app/services/http.service';
import { User } from 'src/app/model/User';
import { EmailService } from 'src/app/services/email.service';
import { EmailComponent } from '../email/email.component';
import {Router} from "@angular/router";
import {Email} from "../../model/Email";
import {Folder} from "../../model/folder";
import {Contact} from "../../model/Contact";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  shownFolders:Folder[]
  constructor(private httpService: EmailHttpService, private emailService: EmailService,private route:Router) {

  }

  //Should be false by default and set to true by back
  private valid = true

  ngOnInit(): void {}

  signUp(firstName: string, lastName: string, email: string, password: string) {
    this.httpService.signUp(new User(firstName, lastName, email, password, [], [])).subscribe(() => {
      let user = new User(firstName, lastName, email, password, [], [])
      this.emailService.setUser(user)
    })
  }

  signIn(email: string, password: string) {

      this.httpService.signIn(email, password).subscribe((user) => {
        let contact:Contact[] = new Array(user['contacts'].length)
        for(let i = 0; i < user['contacts'].length; i++) {
          contact[i]=(new Contact(user['contacts'][i]['emails'], user['contacts'][i]['name']))
          console.log(contact)
        }
        console.log(contact[0].getName())
      let userr = new User(user['firstName'], user['lastName'], user['email'], user['password'], contact, user['userFolders'])
      this.emailService.setUser(userr)
      let email=new EmailComponent(this.httpService,this.emailService,this.route);
      email.initiateEmail();
    })

  }

}
