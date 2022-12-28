import { Injectable } from '@angular/core';
import { EmailHttpService } from '../controller/EmailFacade';
import { Contact } from '../model/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpService: EmailHttpService) {}

  getContact(): Contact { return this.httpService.getContact() }

}
