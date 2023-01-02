import { Component, OnInit } from '@angular/core';
import { EmailHttpService } from 'src/app/services/http.service';
import { Contact } from 'src/app/model/Contact';
import { Email } from 'src/app/model/Email';
import { Folder } from 'src/app/model/folder';
import { User } from 'src/app/model/User';
import { EmailService } from 'src/app/services/email.service';
import { EmailIterator } from 'src/app/services/email-iterator/EmailItirator';

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
  contacts: Contact[]
  allSelected: boolean = false
  //singleton
  public emailIterator: EmailIterator

  constructor(private httpService: EmailHttpService, private emailService: EmailService) {
    this.shownFolders = emailService.getFolders()
    // this.contacts=emailService.getUser().getContacts();
    console.log(this.shownFolders + "hhhhhhhhhhhhh")
    this.shownEmails = []
  }

  ngOnInit(): void {

  }


  initiateEmail(){
    this.emailService.setFolders()
    this.shownFolders = this.emailService.getFolders()
    this.contacts=this.emailService.getUser().getContacts();
    console.log(this.contacts)
  }




  getPageEmails(state: string) {
    this.httpService.getEMails(this.emailService.getCurrentFolder()).subscribe( res=>{
      this.shownEmails=[];
      for (let i = 0; i < res.length; i++) {
        let email=new Email(res[i]["id"], res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]);
        this.shownEmails.push(email);
        this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].addEmail(email)
      }
      console.log(this.shownEmails);
    })

  }
    //add folder (observer updated)
  addFolder(name: string) {
    this.shownFolders.push(new Folder(name))
    this.emailService.names.push(name)
    this.httpService.addFolder(name);
  }

    //delete folder (observer updated)
  deleteFolder(name: string) {
    let index = this.emailService.names.indexOf(name)
    this.emailService.names.splice(index, 1)
    this.shownFolders.splice(index, 1)
    //TODO send to back to delete
  }

    //rename folder (observer updated)
  renameFolder(before:string, after: string) {
    let index = this.emailService.names.indexOf(before)
    this.shownFolders[index].setName(after)
    this.shownFolders[index].setIcon()
    //TODO send to back to rename
  }

  changeSearchLabel(s: string): void {
    this.search = s;
  }

  foldersNavigate(folder: string) {
    this.allSelected = false
    this.selectAll()
    this.emailService.setCurrentFolder(folder)
    this.pagesNavigate('current')
  }

  pagesNavigate(state: string) {
    if(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails().length == 0) { //load folder for the first time
      //TODO send ro back
    } else {
      // this.shownEmails = this.getPageEmails(state)
    }
  }

  sort(sort: string) {}

  addfolder() {
    let name = document.getElementById("FolderName") as HTMLInputElement;
    if (name?.value != '') {
      this.addFolder(name?.value)
      let click = document.getElementById("NewFolder");
      click!.style.display = "none";
    }
    this.httpService.addFolder(name.value).subscribe();
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
        this.shownEmails.push(new Email(res[i]["id"], res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]));
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
    console.log(this.shownEmails[id])
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
  showNewFolder(foler: string) {
    let click = document.getElementById(foler);
    if (click != null && click.style.display === "none") {
      click.style.display = "block";
    } else if (click != null) {
      click.style.display = "none";
    }
    this.allSelected = !this.allSelected
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
    this.allSelected = false
    this.selectAll()

    //TODO send to back
  }
contact():Contact[]{
  console.log(this.emailService.getUser().getContacts())
  return this.emailService.getUser().getContacts();
}
  showDetails(i:number){
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
    // let prevname=window.getName();
    // id.addEventListener("keypress", function(event) {
    //   if (event.key === "Enter") {
    //     event.preventDefault();
    //     if(id.value!=''){
    //
    //       window.setName(id.value);}
    //
    //   }
    // });

    this.httpService.renameFolder(window.getName(),id.value).subscribe();
    console.log("prev"+window.getName()+"   "+"new"+id.value)
    window.setName(id.value);

  }

  delete(folder: Folder){
    if (confirm('The folder will be deleted permanently')) {
      this.deleteFolder(folder.getName());
      this.httpService.deleteFolder(folder.getName()).subscribe();
    }
  }

  moveEmailToFolder(id: number, folder: string) {
    if(this.emailService.getCurrentFolder() == 'trash') {
      this.shownFolders[this.emailService.names.indexOf('trash')].removeEmail(this.shownEmails[id])
      // this.pagesNavigate('current')
      //TODO delete permenantly
    }
    this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].removeEmail(this.shownEmails[id])
    this.shownFolders[this.emailService.names.indexOf(folder)].addEmail(this.shownEmails[id])
    // this.pagesNavigate('current')
  }
  backToContacts(){
    let contact = document.getElementById("contacts");
    let details = document.getElementById("contactDetails");
    contact.style.display="block";
    details.style.display="none";
  }
  addName(){
    let display = document.getElementById("enteredname");
    let name = document.getElementById("nameofcontact") as HTMLInputElement;
    display.textContent = name.value;
  }
  addEmail(){
    let display = document.getElementById("enteredemail");
    let name = document.getElementById("emailOfContact") as HTMLInputElement;
    display.textContent=display.textContent+name.value+", ";
    name.value='';
  }
  addcontact(){
    let contact = document.getElementById("contacts");
    let add = document.getElementById("add_contacts");
    contact.style.display="block";
    add.style.display="none";

    //TODO send contact to back
  }
  back(){
    let contact = document.getElementById("contacts");
    let add = document.getElementById("add_contacts");
    contact.style.display="block";
    add.style.display="none";
  }
  gotoadd(){
    let add = document.getElementById("add_contacts");
    let contact = document.getElementById("contacts");
    contact.style.display="none";
    add.style.display="block";
  }
}
