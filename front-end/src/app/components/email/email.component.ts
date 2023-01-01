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
  contacts: Contact[] = [new Contact('Rowaina', 'Rowainaabdelnaser@gmail.com', [])]

  constructor(private httpService: EmailHttpService, private emailService: EmailService) {}

  ngOnInit(): void {
    this.shownFolders = this.emailService.getFolders()
    this.shownEmails = []
    this.contacts = this.emailService.getUser().getContacts()
    if(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails().length == 0) { //folder first loaded
      //all files of the requenst
      for(let i = 0; i < 50; i++) {
        this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].addEmail(new Email('', i + '', 'mohamed', '10/10/2011', '10:10', 'hello', 'isdgcidshcjdscnskjc', 'mediunm', []))
      }
      this.shownEmails = this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails()
    } else {
      this.shownEmails = this.emailService.getPageEmails('current')
    }
  }

  changeSearchLabel(s:string):void { this.search = s; }

  foldersNavigate(folder: string) {
    this.unSelectAll()
    this.emailService.setCurrentFolder(folder)
    this.pagesNavigate('current')
  }

  pagesNavigate(state: string) {
    if(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails().length == 0) { //load folder for the first time
      this.emailService.emailIterator.setAllEMails(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails())
      this.shownEmails = this.emailService.getPageEmails(state)

    } else {
      this.shownEmails = this.emailService.getPageEmails(state)
    }
  }

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

  setOpenedEmail(id: number) {5
    console.log(this.shownEmails)
    this.emailService.setOpenedEmail(this.shownEmails[id])
  }

  getUserName(): string { return this.emailService.getUser().getFirstName().concat(" " + this.emailService.getUser().getLastName()) }

  getUserEmail(): string { return this.emailService.getUser().getEmail() }

  filter(criteria: string) {
    this.httpService.filter(criteria, 'Neso').subscribe(emails => {
      let index = this.emailService.names.indexOf(this.emailService.getCurrentFolder())
      this.shownFolders[index].setEmails([])
      for(let i = 0; i < emails.length; i++) {
        this.shownFolders[index].addEmail(new Email(emails[i]["id"], emails[i]["from"], emails[i]["to"], emails[i]["date"], emails[i]["time"], emails[i]["subject"], emails[i]["body"], emails[i]["Priority"], emails[i]["attachments"]))
      }
      this.shownEmails = this.emailService.getPageEmails('current')
    })
  }

  sort(sort: string) {
    this.httpService.sort(this.emailService.getCurrentFolder(), sort).subscribe(emails => {
      let index = this.emailService.names.indexOf(this.emailService.getCurrentFolder())
      this.shownFolders[index].setEmails([])
      for(let i = 0; i < emails.length; i++) {
        this.shownFolders[index].addEmail(new Email(emails[i]["id"], emails[i]["from"], emails[i]["to"], emails[i]["date"], emails[i]["time"], emails[i]["subject"], emails[i]["body"], emails[i]["Priority"], emails[i]["attachments"]))
      }
      this.shownEmails = this.emailService.getPageEmails('current')
    })
  }

  getUser(): User { return this.httpService.getUser() }

  getContact(): Contact { return this.httpService.getContact() }

  //move one email
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

  //TODO add icon for mail selection
  //selection of one mail
  select(id: number, ) {
    let index = id + ''
    let click = document.getElementById(index) as HTMLInputElement;
    click.setAttribute("checked", "checked");
    this.selectedEmails.push(this.shownEmails[id])
  }

  //TODO add to select all button
  selectAll() {
    let click = document.getElementById('selectAll') as HTMLInputElement;
    if(click.checked) {
      for(let i = 0; i < this.shownEmails.length; i++) {
        this.select(i)
      }
    } else {
      for(let i = 0; i < this.shownEmails.length; i++) {
        this.unSelectAll()
      }
    }
    //TODO for loop to change style
  }

   //TODO add to select all button
  unSelectAll() {
    this.selectedEmails = []
    //TODO for loop to change style
  }


  //move group of emails
  moveSelectedToFolder(folder: string) {
    for(let i = 0; i < this.selectedEmails.length; i++) {
      for(let j = 0; i < this.shownEmails.length; j++) {
        if(this.shownEmails[i].getId() == this.selectedEmails[j].getId()) {
          this.moveEmailToFolder(j, folder)
          break
        }
      }
    }
    this.unSelectAll()
    //TODO send to back
  }

  rename(window: Folder, id:HTMLInputElement) {
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  edit(){
    let click = document.getElementById("name") ;
    console.log(click.innerText)
  }
}
