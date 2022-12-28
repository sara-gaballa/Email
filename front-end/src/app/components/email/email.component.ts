import { Component } from '@angular/core';
import { Email } from 'src/app/model/Email';
import { Folder } from 'src/app/model/Folder';
import { ContactService } from 'src/app/services/contact.service';
import { EMailDataService } from 'src/app/services/email-data.service';
import { EmailsManipulationService } from 'src/app/services/emails-manipulation.service';
import { FolderManagerService } from 'src/app/services/folder-manager.service';
import { LoggingService } from 'src/app/services/logging.service';
import { UserService } from 'src/app/services/user.service';

//observable and all services observers except EmailHttpService is the facade for our program
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  search: string = 'Search'
  click: string = ''
  shownFolders: Folder[] = []
  shownEmails: Email[] = []

  constructor(private folders: FolderManagerService, private userService: UserService, private contaceService: ContactService,
              private navigationService: LoggingService, private emailDataService: EMailDataService, private emailManipulationService: EmailsManipulationService) {
    this.shownFolders = folders.getFolders()
    this.shownEmails = emailDataService.getPageEmails('current')
  }

  changeSearchLabel(s:string):void { this.search = s; }

  foldersNavigate(folder: string) { this.folders.setCurrentFolder(folder) } //can' remember if current is viewed or not..If not, "this.shownEmails = emailDataService.getPageEmails('current')"

  pagesNavigate(state: string) { this.emailDataService.getPageEmails(state) }

  addfolder(){
    let name=document.getElementById("FolderName") as HTMLInputElement ;
    if(name?.value!=''){
      this.folders.addFolder(name?.value)
      this.folders.getFolders()
      let click = document.getElementById("NewFolder");
      click!.style.display = "none";
    }
    name.value='';
  }

  showWindow(window: string){
    let click = document.getElementById(window);
      if(click != null && click.style.display === "none") {
          click.style.display = "block";
      } else if(click != null) {
          click.style.display = "none";
      }
  }

  setOpenedEmail(id: number) { this.emailDataService.setOpenedEmail(this.shownEmails[id]) }

  // logout() { this.loggingService.logout() }

  getUserName(): string { return this.userService.getUser().getFirstName().concat(" " + this.userService.getUser().getLastName()) }

  getUserEmail(): string { return this.userService.getUser().getEmail() }

  // search(search: string) {  }

  sort(sort: string) { this.emailManipulationService.sort(this.folders.getCurrentFolder(), sort) }

  ///////////////////////////////////////////
  //Put this on arrows for navigation:
  // (click)="pagesNavigate('next')"
  // (click)="pagesNavigate('previouse')"
cl(){
  let click = document.getElementById("body");
  let c = document.getElementById("window");
  c.style.display="none";
}
}
