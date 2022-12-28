import { Injectable } from '@angular/core';
import { EmailHttpService } from '../controller/EmailFacade';
import { Email } from '../model/Email';
import { FolderManagerService } from './folder-manager.service';

//All Mails
@Injectable({
  providedIn: 'root'
})
export class EMailDataService {

  //initial opened email and changes when user chooses the desired email
  openedEmail: Email = new Email("111", "Rowaina", "SaraNancyMariam", "12/27/2022", "11:50AM", "The Project is on fire", "GG")

  constructor(private httpService: EmailHttpService, private folderManager: FolderManagerService) {}

  /*state:
    - current: no navigation yet ie first page view
    - next: gets next page
    - previouse: gets previous page
  */
  getPageEmails(state: string): Email[] { return this.httpService.getEMails(this.folderManager.getCurrentFolder(), state) }

  setOpenedEmail(email: Email) { this.openedEmail = email }

  getOpenedEmail(): Email { return this.openedEmail }

  sort(folder: string, sort: string) { this.httpService.sort(folder, sort) }

  search() {}

  filter() {}

}
