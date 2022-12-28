import { Component } from '@angular/core';
import { Email } from 'src/app/model/Email';
import { Folder } from 'src/app/model/Folder';
import { ContactService } from 'src/app/services/contact.service';
import { EMailDataService } from 'src/app/services/email-data.service';
import { FolderManagerService } from 'src/app/services/folder-manager.service';
import { NavigationService } from 'src/app/services/navigation.service';
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
              private navigationService: NavigationService, private emailDataService: EMailDataService) {
    this.shownFolders = folders.getFolders()
    this.shownEmails = emailDataService.getCurrentPageEmails()
  }

  change(s:string):void{
    this.search = s;
  }

  navigate(page: string) {
    this.folders.setCurrentFolder(page)
  }

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

  logout() { this.navigationService.logout() }

  getUserName(): string { return this.userService.getUser().getFirstName().concat(" " + this.userService.getUser().getLastName()) }

  getUserEmail(): string { return this.userService.getUser().getEmail() }

}
