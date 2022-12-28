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
  openedEmail: Email = new Email("111", "Rowaina", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG")

  constructor(private httpService: EmailHttpService, private folderManager: FolderManagerService) {}

  getCurrentPageEmails(): Email[] { return this.httpService.getEMails(this.folderManager.getCurrentFolder()) }

  setOpenedEmail(email: Email) { this.openedEmail = email }

  getOpenedEmail(): Email { return this.openedEmail }

}
