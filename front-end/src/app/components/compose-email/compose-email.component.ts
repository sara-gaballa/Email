import { Component, OnInit } from '@angular/core';
import { EmailHttpService } from 'src/app/controller/EmailFacade';
import { DraftEmail } from 'src/app/model/DraftEmail';
import { Email } from 'src/app/model/Email';
import { Folder } from 'src/app/model/Folder';
import { FolderManagerService } from 'src/app/services/folder-manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.css']
})
export class ComposeEmailComponent implements OnInit {

  private composingEmail: DraftEmail
  private folders: Folder[]
  private draftFolder: Folder

  //httpService can be moved to compose service and be used insetead
  //also will be useful on sending data during composing
  constructor(private httpService: EmailHttpService, private userService: UserService, folderManager: FolderManagerService) {
    this.folders = folderManager.getFolders()
    this.draftFolder = this.folders[3]
    this.draftFolder.addEmail(this.composingEmail)
  }

  ngOnInit(): void {}

  changeTo(to: string) { this.composingEmail.setTo(to); console.log(to) }

  changeSubject(subject: string) { this.composingEmail.setSubject(subject) }

  changeBody(body: string) { this.composingEmail.setBody(body) }

  send(to: string, subject: string, emailBody: string) {
    //remove from draft here and back
    this.draftFolder.removeEmail(this.composingEmail)
    this.folders[1].addEmail(this.composingEmail)
    this.httpService.sendEmail(new Email('0', this.userService.getUser().getEmail(), to, '25/8/2002', '5:04', subject, emailBody))
  }

}
