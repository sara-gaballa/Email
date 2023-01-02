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
  selectedEmails: Email[] = []
  contacts: Contact[] = [new Contact(["Rowainaabdelnasser@galaxy.com"])]
  allSelected: boolean = false

  constructor(private httpService: EmailHttpService, private emailService: EmailService) {
    this.shownFolders = emailService.getFolders()
    console.log(this.shownFolders + "hhhhhhhhhhhhh")
    this.shownEmails = []
 /*    emailService.getPageEmails('current').subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.shownEmails.push(new Email(res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]));
        console.log(res[i])
      }
     }) */
  }

  ngOnInit(): void {
    this.shownFolders = this.emailService.getFolders()
    this.shownEmails = []
    this.contacts = this.emailService.getUser().getContacts()
    if(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails().length == 0) { //folder first loaded
      //all files of the requenst
      for(let i = 0; i < 50; i++) {
        this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].addEmail(new Email('', i + '', [], '10/10/2011', '10:10', 'hello', 'isdgcidshcjdscnskjc', 'mediunm', []))
      }
      this.shownEmails = this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails()
    } else {
      this.shownEmails = this.emailService.getPageEmails('current')
    }
  }


  changeSearchLabel(s: string): void {
    this.search = s;
  }

  foldersNavigate(folder: string) {
    this.allSelected = false
    this.selectAll()
    this.emailService.setCurrentFolder(folder)
    // this.pagesNavigate('current')
  }

  pagesNavigate(state: string) {
    if(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails().length == 0) { //load folder for the first time
      this.emailService.emailIterator.setAllEMails(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails())
      this.shownEmails = this.emailService.getPageEmails(state)

    } else {
      this.shownEmails = this.emailService.getPageEmails(state)
    }
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

  filter(criteria: string) {
    this.httpService.filter(criteria, 'Neso').subscribe(res => {
      console.log("sent successfully")
      this.shownEmails = []
      for (let i = 0; i < res.length; i++) {
        // this.shownEmails.push(new Email(res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]));
        console.log(res[i])
      }
    })
  }

  getUserName(): string {
    return this.emailService.getUser().getFirstName().concat(" " + this.emailService.getUser().getLastName())
  }

  getUserEmail(): string {
    return this.emailService.getUser().getEmail()
  }


  setOpenedEmail(id: number) {
    console.log(this.shownEmails)
    this.emailService.setOpenedEmail(this.shownEmails[id])
  }

  //TODO add icon for mail selection
  //selection of one mail
  selectAllOne(id: number, checked: boolean) {
    let index = id + ''
    let click = document.getElementById(index) as HTMLInputElement;
    if(checked) {
      click.setAttribute("checked", "checked");
      this.selectedEmails.push(this.shownEmails[id])
    } else {
      click.removeAttribute("checked");
    }
  }

  select(id: number) {
    let index = id + ''
    let click = document.getElementById(index) as HTMLInputElement;
    if(click.checked) {
      click.setAttribute("checked", "checked");
      this.selectedEmails.push(this.shownEmails[id])
    } else {
      click.removeAttribute("checked");
      this.selectedEmails.splice(this.shownEmails.indexOf(this.selectedEmails[id]), 1)
    }
  }


  //TODO add to select all button
  selectAll() {
    this.selectedEmails = []
    let click = document.getElementById('selectAll') as HTMLInputElement;
    if(click.checked) {
      for(let i = 0; i < this.shownEmails.length; i++) {
        this.selectAllOne(i, true)
      }
    } else {
      for(let i = 0; i < this.shownEmails.length; i++) {
        this.selectAllOne(i, false)
      }
    }
  }

  // sort(sort: string) {
  //   this.emailService.sort(this.emailService.getCurrentFolder(), sort)
  // }

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
    this.allSelected = !this.allSelected
  }
  // delete(folder: Folder){
  //   this.emailService.deleteFolder(folder.getName());
  // }
  // rename(window: Folder,id:HTMLInputElement) {
  //   id.addEventListener("keypress", function(event) {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       if(id.value!=''){
  //         window.setName(id.value);}
  //     }
  //   });
  // }


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
    this.allSelected = false
    this.selectAll()
    //TODO send to back
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
  rename(window: Folder,id:HTMLInputElement) {
    id.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if(id.value!=''){
          window.setName(id.value);}
        else{
          //nothing
        }
      }
    });
  }

  delete(folder: Folder){
    if (confirm('The folder will be deleted permanently')) {
      this.emailService.deleteFolder(folder.getName());}
  }

  moveEmailToFolder(id: number, folder: string) {
    if(this.emailService.getCurrentFolder() == 'trash') {
      this.shownFolders[this.emailService.names.indexOf('trash')].removeEmail(this.shownEmails[id])
      this.pagesNavigate('current')
      //TODO delete permenantly
    }
    this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].removeEmail(this.shownEmails[id])
    this.shownFolders[this.emailService.names.indexOf(folder)].addEmail(this.shownEmails[id])
    this.pagesNavigate('current')
  }

}
