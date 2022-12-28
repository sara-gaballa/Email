import { Injectable } from '@angular/core';
import { EmailHttpService } from '../controller/EmailFacade';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: EmailHttpService) {}

  getUser(): User { return this.httpService.getUser() }

}
