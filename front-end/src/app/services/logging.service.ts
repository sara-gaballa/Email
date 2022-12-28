import { Injectable } from '@angular/core';
import { EmailHttpService } from '../controller/EmailFacade';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private httpService: EmailHttpService) { }

  logout() { this.httpService.logout() }

  signUp(user: User) { this.httpService.signUp(user) }

  signIn(email: string, password: string) { this.httpService.signIn(email, password) }

}
