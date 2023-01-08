import { Component } from '@angular/core';
import { EmailHttpService } from 'src/app/services/http.service';
import { Contact } from 'src/app/model/Contact';
import { Email } from 'src/app/model/Email';
import { Folder } from 'src/app/model/folder';
import { EmailService } from 'src/app/services/email.service';
import {Router} from "@angular/router";
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  check: number = 0;
  shownFolders: Folder[] = [new Folder('')]
  shownEmails: Email[] = []
  selectedEmails: Email[] = []
  contacts: Contact[] = []
  allSelected: boolean = false
  currentContact: Contact =  new Contact(["00", "000", "000"], "")
  contactName: string = ''
  contactEmails: string = ''
  user: User = new User('', '', '', '', [], [])

  constructor(private httpService: EmailHttpService, private emailService: EmailService,private  route:Router) {
    this.shownFolders = emailService.getFolders()
    this.shownEmails = []
    this.user = emailService.getUser()
  }

  initiateEmail(){
    this.user = this.emailService.getUser()
    this.shownFolders = this.emailService.getFolders()
    this.contacts = this.emailService.getUser().getContacts();
    if(this.user.getUserFolders().length != 0)
      this.shownFolders.splice(4, this.shownFolders.length - 4)
    for(let i = 0; i < this.user.getUserFolders().length; i++) {
      this.shownFolders.push(new Folder(this.user.getUserFolders()[i]))
      this.emailService.names.push(this.user.getUserFolders()[i])
    }
  }

  getPageEmails(folder: string) {
    this.selectedEmails = []
    this.check = 0;
    let click = document.getElementById('selectAll') as HTMLInputElement;
    click.checked = false;
    this.selectAll()
    this.emailService.setCurrentFolder(folder)
    this.shownEmails=[];
    this.httpService.getEMails(folder).subscribe( res=>{ this.loadEmails(res, folder) })
    this.route.navigate(["/emails"]);
  }

  loadEmails(res: any, folder: string) {
    this.shownEmails=[];
    this.shownFolders[this.emailService.names.indexOf(folder)].setEmails([])
    for (let i = 0; i < res.length; i++) {
      let email=new Email(res[i]["id"], res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["priority"], res[i]["attachments"]);
      this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].addEmail(email)
    }
    this.pagesNavigate('current')
  }

  sort(kind: string) {
    if(kind == 'emails') {
      let sort= document.getElementById("sort") as HTMLInputElement;
      this.shownEmails = [];
      this.httpService.sort(sort.value).subscribe( res=>{
        this.loadEmails(res, this.emailService.getCurrentFolder())
      })
    } else if(kind == 'contacts') {
      this.httpService.sortContacts().subscribe((res)=> {
        for(let i = 0; i < res.length; i++) {
          this.contacts[i] = new Contact(res[i]['emails'], res[i]['name'])
        }
      })
    } else if(kind == 'priority') {
      this.httpService.sortByPriority().subscribe((res) => {
        this.loadEmails(res, this.emailService.getCurrentFolder())
      })
    }
  }

  addfolder() {
    let name = document.getElementById("FolderName") as HTMLInputElement;
    if (name?.value != '') {
      this.shownFolders.push(new Folder(name?.value))
      this.emailService.names.push(name?.value)
      let click = document.getElementById("NewFolder");
      click!.style.display = "none";
    }
    this.httpService.addFolder(name.value).subscribe(() => { name.value = '' });
  }

  showWindow(window: string) {
    let click = document.getElementById(window);
    if (click != null && click.style.display === "none") {
      click.style.display = "block";
    } else if (click != null) {
      click.style.display = "none";
    }
  }

  filter() {
    let type = document.getElementById("filtertype") as HTMLInputElement;
    let dest = document.getElementById("filterDest") as HTMLInputElement;
    this.httpService.filter(type.value, dest.value).subscribe(res => {
      this.loadEmails(res, this.emailService.getCurrentFolder())
    })
  }

  setOpenedEmail(id: number) { this.emailService.setOpenedEmail(this.shownEmails[id]) }

  logout(){ this.httpService.logout().subscribe() }

  getUser() { return this.emailService.getUser() }

  search(value: string, kind: string){
    if(kind == 'email') {
      let type = document.getElementById("search") as HTMLFormElement;
      let t: FormData;
      t = new FormData(type)
      this.httpService.search(t.getAll('type') as string[], value).subscribe(res => {
        this.loadEmails(res, this.emailService.getCurrentFolder())
      })
    } else if(kind == 'contacts') {
      this.httpService.searchContacts('name', value).subscribe((res)=> {
        let contact: Contact[] = new Array(res.length)
        for(let i = 0; i < res.length; i++) {
          contact[i] = new Contact(res[i]['emails'], res[i]['name'])
        }
        this.contacts = contact
      })
    }
  }

  showContacts() {
    this.user = this.emailService.getUser()
    this.contacts = this.user.getContacts()
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
  }

  showContactDetails(index: number){
    this.showWindow('contactDetails')
    this.currentContact = this.contacts[index]
  }


  rename(window: Folder,id: string){
    let index = this.emailService.names.indexOf(window.getName())
    this.shownFolders[index].setName(id) //set Folder name
    this.emailService.names[index] = id //set names
    window.setName(id); // change shown name
    this.emailService.setCurrentFolder(id) //set current folder
    this.httpService.renameFolder(window.getName(), id).subscribe();
  }

  delete(folder: Folder, kind: string, id: number){
    if(kind == 'folder') {
      if (confirm('The folder will be deleted permanently')) {
        let index = this.emailService.names.indexOf(folder.getName())
        this.emailService.names.splice(index, 1)
        this.shownFolders.splice(index, 1)
        this.httpService.deleteFolder(folder.getName()).subscribe();
      }
    } else if(kind == 'contact') { //DONE
      if (confirm('The contact will be deleted permanently')) {
        this.httpService.deleteContact(this.contacts[id].getName()).subscribe(() => {
          this.contacts.splice(id, 1)
          this.showContacts()
        })
      }
    } else if(kind == 'emailContact') {
      if (confirm('The email will be deleted permanently')) {
        let email = this.contacts[this.contacts.indexOf(this.currentContact)].getEmails()
        email.splice(id, 1)
        this.contacts[this.contacts.indexOf(this.currentContact)].setEmails(email)
        this.currentContact.setEmails(email)
        this.httpService.editContact(this.currentContact.getName(), this.currentContact).subscribe()
      }
    }
  }

  back(block: string, none: string){
    let contact = document.getElementById(block);
    let details = document.getElementById(none);
    contact.style.display = "block";
    details.style.display = "none";
  }

  addName(){
    let display = document.getElementById("enteredname");
    let name = document.getElementById("nameofcontact") as HTMLInputElement;
    display.textContent = name.value;
    this.contactName = name.value
  }

  addEmail(){
    let display = document.getElementById("enteredemail");
    let name = document.getElementById("emailOfContact") as HTMLInputElement;
    display.textContent = display.textContent + name.value + ", ";
    name.value = '';
    this.contactEmails = display.textContent
  }

  addcontact(){
    let contact = document.getElementById("contacts");
    let add = document.getElementById("add_contacts");
    add.style.display="none";
    contact.style.display="block";
    let emails = this.contactEmails.split(', ');
    emails.pop()
    let sentContact = new Contact(emails, this.contactName)
    this.httpService.addContact(sentContact).subscribe(() => {
      this.contacts.push(sentContact)
      this.contactEmails = ''
      this.contactName = ''
    })
  }

  addNewEmail(email: string) {
    this.currentContact.addEmail(email)
    this.httpService.editContact(this.currentContact.getName(), this.currentContact).subscribe()
  }

  gotoadd(){
    let add = document.getElementById("add_contacts");
    let contact = document.getElementById("contacts");
    contact.style.display="none";
    add.style.display="block";
    let email = document.getElementById("emailOfContact") as HTMLInputElement;
    let name = document.getElementById("nameofcontact") as HTMLInputElement;
    name.value = ""
    email.value = ""
  }

  //manually panigation
  pagesNavigate(state: string) {
    let len = this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails().length;
    let next = this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails().indexOf(this.shownEmails[this.shownEmails.length-1])
    let prev = this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails().indexOf(this.shownEmails[0])
    if( ((len - 1) - next) <= 0 && state == 'next' ||  prev==0 && state == 'previous') { return }
    for(let i = 0; i < 10; i++){
      this.shownEmails.pop();
    }
    if(state == 'current') {
      for(let i = 0; i < 10; i++) {
        if(i == len) return
        this.shownEmails.push(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails()[i]);
      }
    } else if(state == 'previous'){
      for(let i = prev-10; i < prev ; i++){
        if(i < 0){ break }
        this.shownEmails.push(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails()[i]);
      }
    } else if(state == 'next'){
      for(let i = next + 1; i < next + 11 ; i++){
        if(i == len){ break }
        this.shownEmails.push(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails()[i]);
      }
    }
  }

  //one by one selection or deselection on select all
  selectAllOne(id: number, select: boolean) {
    let index = id + ''
    let click = document.getElementById(index) as HTMLInputElement;
    let click1 = document.getElementById("check-box");
    if(select == true) {
      click.checked = true;
      this.selectedEmails.push(this.shownEmails[id])
      click1.style.display = "block";
    } else {
      click.checked = false;
      this.selectedEmails.pop()
      click1.style.display = "none";
    }
  }

  select(id: number) {
    let index = id + ''
    let click = document.getElementById(index) as HTMLInputElement;
    let click1 = document.getElementById("check-box");
    if(click.checked) {
      this.check=this.check + 1;
      click.checked=true;
      this.selectedEmails.push(this.shownEmails[id])
      click1.style.display = "block";
    } else {
      this.check=this.check-1;
      if(this.check == 0) {
        click.checked=false;
        click1.style.display = "none";
      }
      this.selectedEmails.splice(this.shownEmails.indexOf(this.selectedEmails[id]),1) //////////////error
    }
  }

  selectAll() {
    this.selectedEmails = []
    let click1 = document.getElementById("check-box");
    let click = document.getElementById('selectAll') as HTMLInputElement;
    if(click.checked) {
      for(let i = 0; i < this.shownEmails.length; i++) {
        this.selectAllOne(i, true)
      }
      this.check=this.shownEmails.length;
      click1.style.display = "block";
    } else {
      for(let i = 0; i < this.shownEmails.length; i++) {
        this.selectAllOne(i, false)
      }
      this.check=0;
      click1.style.display = "none";
    }
  }
  edit(kind: string, value: string, id: number){
    console.log(kind)
    if(kind == 'name') {
      let click = document.getElementById("name")
      let name = this.currentContact.getName()
      this.currentContact.setName(click.innerText)
      console.log(this.currentContact)
      this.httpService.editContact(name, this.currentContact).subscribe()
    } else if(kind == 'email') {
      let emails = this.currentContact.getEmails()
      emails[id] = value
      this.contacts[this.contacts.indexOf(this.currentContact)].setEmails(emails)
      this.currentContact.setEmails(emails)
      this.httpService.editContact(this.currentContact.getName(), this.currentContact).subscribe()
    }
  }
  moveEmailToFolder(folder: string) {
    let id = []
    for(let i = 0; i < this.selectedEmails.length; i++) { id.push(this.selectedEmails[i].getId()) }
    this.httpService.move(this.emailService.currentFolder, folder, id).subscribe(() => {
      this.pagesNavigate('current')
      this.getPageEmails(this.emailService.currentFolder)
    })
  }
}
