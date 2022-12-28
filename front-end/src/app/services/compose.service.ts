import { Injectable } from '@angular/core';
import { EmailHttpService } from '../controller/EmailFacade';
import { Email } from '../model/Email';

@Injectable({
  providedIn: 'root'
})
export class ComposeService {

  constructor(private httpService: EmailHttpService) { }

  sendComposedEmail(email: Email) {
    this.httpService.sendEmail(email)
  }

}
