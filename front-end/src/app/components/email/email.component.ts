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
export class EmailComponent implements OnInit {
  search: string = 'Search'
  click: string = ''
  shownFolders: Folder[] = []
  shownEmails: Email[] = []

  constructor(private httpService: EmailHttpService, private emailService: EmailService) {
    this.shownFolders = emailService.getFolders()
    console.log(this.shownFolders + "hhhhhhhhhhhhh")
    this.shownEmails = []
    emailService.getPageEmails('current').subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.shownEmails.push(new Email(res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]));
        console.log(res[i])
      }
    })
  }

  ngOnInit(): void {

  }

  changeSearchLabel(s: string): void {
    this.search = s;
  }

  foldersNavigate(folder: string) {
    this.emailService.setCurrentFolder(folder)
    this.pagesNavigate('current')
  }

  pagesNavigate(state: string) {
    this.emailService.getPageEmails(state).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.shownEmails.push(new Email(res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]));
        console.log(res[i])
      }
    })
  }

  addfolder() {
    let name = document.getElementById("FolderName") as HTMLInputElement;
    if (name?.value != '') {
      this.emailService.addFolder(name?.value)
      let click = document.getElementById("NewFolder");
      click!.style.display = "none";
    }
    name.value = '';
  }

  showWindow(window: string) {
    let click = document.getElementById(window);
    if (click != null && click.style.display === "none") {
      click.style.display = "block";
    } else if (click != null) {
      click.style.display = "none";
    }
  }


  setOpenedEmail(id: number) {
    console.log(this.shownEmails)
    this.emailService.setOpenedEmail(this.shownEmails[id])
  }

  getUserName(): string {
    return this.emailService.getUser().getFirstName().concat(" " + this.emailService.getUser().getLastName())
  }

  getUserEmail(): string {
    return this.emailService.getUser().getEmail()
  }

  filter(criteria: string) {
    this.httpService.filter(criteria, 'Neso').subscribe(res => {
      console.log("sent successfully")
      this.shownEmails = []
      for (let i = 0; i < res.length; i++) {
        this.shownEmails.push(new Email(res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]));
        console.log(res[i])
      }
    })
  }

  sort(sort: string) {
    this.emailService.sort(this.emailService.getCurrentFolder(), sort)
  }

  getUser(): User {
    return this.httpService.getUser()
  }

  getContact(): Contact {
    return this.httpService.getContact()
  }

  showNewFolder(foler: string) {
    let click = document.getElementById(foler);
    if (click != null && click.style.display === "none") {
      click.style.display = "block";
    } else if (click != null) {
      click.style.display = "none";
    }
  }
  delete(folder: Folder){
    this.emailService.deleteFolder(folder.getName());
  }
  rename(window: Folder,id:HTMLInputElement) {
    id.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if(id.value!=''){
          window.setName(id.value);}
      }
    });
  }


  showContacts() {
    let click = document.getElementById("contacts");
    let details = document.getElementById("contactDetails");
    if (click != null && click.style.display === "none") {
      click.style.display = "block";
      details.style.display="none";
    } else if (click != null) {
      click.style.display = "none";
      details.style.display="none";
    }
  }

  showDetails(){
    let click = document.getElementById("contactDetails");
    if (click != null && click.style.display === "none") {
      click.style.display = "block";
    } else if (click != null) {
      click.style.display = "none";
    }
  }
  edit(){
    let click = document.getElementById("name") ;
    console.log(click.innerText)

  }

}
