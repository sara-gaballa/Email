import { Component, OnInit } from '@angular/core';
import { EmailHttpService } from 'src/app/services/http.service';
import { Contact } from 'src/app/model/Contact';
import { Email } from 'src/app/model/Email';
import { Folder } from 'src/app/model/folder';
import { User } from 'src/app/model/User';
import { EmailService } from 'src/app/services/email.service';

//observable and all services observers except EmailHttpService is the facade for our program
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit{
  search: string = 'Search'
  click: string = ''
  shownFolders: Folder[] = []
  shownEmails: Email[] = []

  constructor(private httpService: EmailHttpService, private emailService: EmailService) {
    this.shownFolders = emailService.getFolders()
    console.log(this.shownFolders + "hhhhhhhhhhhhh")
    this.shownEmails = emailService.getPageEmails('current')
  }

  ngOnInit(): void {

  }

  changeSearchLabel(s:string):void { this.search = s; }

  foldersNavigate(folder: string) {
    this.emailService.setCurrentFolder(folder)
    this.emailService.getPageEmails('current')
  }

  pagesNavigate(state: string) { this.emailService.getPageEmails(state) }

  addfolder(){
    let name = document.getElementById("FolderName") as HTMLInputElement ;
    if(name?.value!=''){
      this.emailService.addFolder(name?.value)
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

  setOpenedEmail(id: number) {
    console.log(this.shownEmails)
    this.emailService.setOpenedEmail(this.shownEmails[id])
  }

  getUserName(): string { return this.emailService.getUser().getFirstName().concat(" " + this.emailService.getUser().getLastName()) }

  getUserEmail(): string { return this.emailService.getUser().getEmail() }

  filter(criteria: string) {
    this.httpService.filter(criteria, 'Neso').subscribe(res => {
      console.log("sent successfully")
      this.shownEmails = []
      for(let i = 0; i < res.length; i++) {
        this.shownEmails.push(res[i]);
        console.log(res[i])
      }
    })
  }

  sort(sort: string) { this.emailService.sort(this.emailService.getCurrentFolder(), sort) }

  getUser(): User { return this.httpService.getUser() }

  getContact(): Contact { return this.httpService.getContact() }


}
