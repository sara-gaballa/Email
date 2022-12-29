import { Injectable } from '@angular/core';
import { EmailHttpService } from '../controller/EmailFacade';
import { Contact } from '../model/Contact';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: EmailHttpService) {}

  getUser(): User { return this.httpService.getUser() }

  getContact(): Contact { return this.httpService.getContact() }

}
