import { Injectable } from '@angular/core';
import { EmailHttpService } from '../controller/EmailFacade';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private httpService: EmailHttpService) { }

  logout() { this.httpService.logout() }

  signUp(userName: string, email: string, password: string) { this.httpService.signUp(userName, email, password) }

  signIn(email: string, password: string) { this.httpService.signIn(email, password) }

}
