import { Component, OnInit } from '@angular/core';
import { DraftEmail } from 'src/app/model/DraftEmail';
import { Email } from 'src/app/model/Email';
import { Folder } from 'src/app/model/Folder';
import { ComposeService } from 'src/app/services/compose.service';
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

  constructor(private composeService: ComposeService, private userService: UserService, folderManager: FolderManagerService) {
    this.folders = folderManager.getFolders()
    this.draftFolder = this.folders[3]
    this.draftFolder.addEmail(this.composingEmail)
  }

  ngOnInit(): void {}

  changeTo(to: string) { this.composingEmail.setTo(to); console.log(to) }

  changeSubject(subject: string) { this.composingEmail.setSubject(subject) }

  changeBody(body: string) { this.composingEmail.setBody(body) }

  sendComposedEmail(to: string, subject: string, emailBody: string) {
    //remove from draft here and back
    this.draftFolder.removeEmail(this.composingEmail)
    this.folders[1].addEmail(this.composingEmail)
    this.composeService.sendComposedEmail(new Email('0', this.userService.getUser().getEmail(), to, '25/8/2002', '5:04', subject, emailBody))
  }
  submit(){
    let a=document.getElementById("f") as HTMLInputElement;
    console.log(a.value);
  }

}
