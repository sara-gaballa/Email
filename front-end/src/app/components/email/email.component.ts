import { Component, OnInit } from '@angular/core';
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
export class EmailComponent implements OnInit {
  // searchLable: string = ''
  check:number=0;
  click: string = ''
  shownFolders: Folder[] = [new Folder('')]
  shownEmails: Email[] = []
  selectedEmails: Email[] = []
  contacts: Contact[] = []
  allSelected: boolean = false
  currentContact: Contact =  new Contact(["00", "000", "000"], "rowaina")
  contactName: string = ''
  contactEmails: string = ''
  user: User=this.emailService.getUser();

  constructor(private httpService: EmailHttpService, private emailService: EmailService,private  route:Router) {
    this.shownFolders = emailService.getFolders()
    // this.contacts=emailService.getUser().getContacts();
    console.log(this.shownFolders + "hhhhhhhhhhhhh")
    this.shownEmails = []

    for(let i = 0; i < 3; i++) {
      this.contacts.push(new Contact(["00", "000", "000"], i + ''))
    }
    this.user = emailService.getUser()
    // console.log(this.user)
  }

  ngOnInit(): void {

  }


  initiateEmail(){
    this.user = this.emailService.getUser()
    this.emailService.setFolders()
    this.shownFolders = this.emailService.getFolders()
    this.contacts=this.emailService.getUser().getContacts();
    console.log(this.user.getUserFolders().length)
    for(let i = 0; i < this.user.getUserFolders().length; i++) {
      this.shownFolders.push(new Folder(this.user.getUserFolders()[i]))
    }
    console.log(this.contacts)
    console.log(this.user)
  }

  refresh() { //TODO test
    console.log("refresh")
    this.httpService.getEMails('inbox').subscribe((res) => {
      this.emailService.setCurrentFolder('inbox')
      this.shownFolders[this.emailService.names.indexOf('inbox')].setEmails([])
      for(let i = 0; i < res.length; i++) {
        let email =new Email(res[i]["id"], res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]);
        this.shownEmails.push(email);
        this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].addEmail(email)
      }
      this.pagesNavigate('current')
    })
  }

  getPageEmails(folder: string) {
    // this.allSelected = false
    // this.selectAll()
    this.emailService.setCurrentFolder(folder)
    this.shownEmails=[];
    this.httpService.getEMails(this.emailService.getCurrentFolder()).subscribe( res=>{
      this.shownEmails=[];
      for (let i = 0; i < res.length; i++) {
        let email=new Email(res[i]["id"], res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]);
        this.shownEmails.push(email);
        this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].addEmail(email)
      }
      console.log(this.shownEmails);
      // this.pagesNavigate('current')
    })
    this.route.navigate(["/emails"]);
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

  // changeSearchLabel(s: string): void {
  //   this.searchLable = s;
  // }



  sort() {
    let sort= document.getElementById("sort") as HTMLInputElement;
    this.shownEmails=[];
    this.httpService.sort(sort.value).subscribe( res=>{
      this.shownEmails=[];
      for (let i = 0; i < res.length; i++) {
        let email=new Email(res[i]["id"], res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]);
        this.shownEmails.push(email);
        this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].addEmail(email)
      }
      console.log(this.shownEmails);
    })
  }

  addfolder() {
    let name = document.getElementById("FolderName") as HTMLInputElement;
    if (name?.value != '') {
      this.addFolder(name?.value)
      let click = document.getElementById("NewFolder");
      click!.style.display = "none";
    }
    this.httpService.addFolder(name.value).subscribe(() => {
      name.value = '';
    });

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
    this.httpService.filter(type.value,dest.value ).subscribe(res => {
      console.log("sent successfully")
      this.shownEmails = []
      for (let i = 0; i < res.length; i++) {
        this.shownEmails.push(new Email(res[i]["id"], res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]));
        console.log(res[i])
      }
      console.log(type.value,dest.value)
    })
  }

  sortContacts() {

  }

  getUserName(): string { return this.emailService.getUser().getFirstName().concat(" " + this.emailService.getUser().getLastName()) }

  getUserEmail(): string { return this.emailService.getUser().getEmail() }

  setOpenedEmail(id: number) {
    console.log(this.shownEmails)
    this.emailService.setOpenedEmail(this.shownEmails[id])
    console.log(this.shownEmails[id])
  }

  //TODO add icon for mail selection
  //selection of one mail

  search(value: string, kind: string){
    if(kind == 'email') {
      let type = document.getElementById("search") as HTMLFormElement;
      let t: FormData;
      t = new FormData(type)
      this.httpService.search(t.getAll('type') as string[], value).subscribe(res => {
        console.log("sent successfully")
        this.shownEmails = []
        for (let i = 0; i < res.length; i++) {
          this.shownEmails.push(new Email(res[i]["id"], res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]));
          console.log(res[i])
        }
      })
      console.log(value, t.getAll('type'));
    } else if(kind == 'contats') {
      /* this.httpService.searchContacts(value, ) */
    }
  }

  logout(){ this.httpService.logout().subscribe() }

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
  }

  showContactDetails(i:number){ //TODO test
    this.showWindow('contactDetails')
    this.currentContact = this.contacts[i]
  }

  edit(){
    let click = document.getElementById("name") ;
    console.log(click.innerText)
  }

  rename(window: Folder,id:HTMLInputElement){ //TODO test
    console.log("prev"+window.getName()+"   "+"new"+id.value)
    this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].setName(window.getName())
    window.setName(id.value);
    this.httpService.renameFolder(window.getName(),id.value).subscribe();
  }

  delete(folder: Folder, kind: string, id: number){
    if(kind == 'folder') {
      if (confirm('The folder will be deleted permanently')) {
        this.deleteFolder(folder.getName());
        this.httpService.deleteFolder(folder.getName()).subscribe();
      }
    } else if(kind == 'contact') { //TODO test
      if (confirm('The contact will be deleted permanently')) {
        this.httpService.deleteContact(this.contacts[id].getName()).subscribe(() => {
          this.contacts.splice(id, 1)
        })
      }
    } else if(kind == 'emailContact') { //TODO test
      if (confirm('The email will be deleted permanently')) {
        let email = this.contacts[this.contacts.indexOf(this.currentContact)].getEmails()
        email.splice(id, 1)
        this.contacts[this.contacts.indexOf(this.currentContact)].setEmails(email)
        console.log(this.contacts[id].getEmails())
        this.httpService.deleteContact(this.currentContact.getName()).subscribe()
      }
    }
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
    this.contactName = name.value
  }

  addEmail(){
    let display = document.getElementById("enteredemail");
    let name = document.getElementById("emailOfContact") as HTMLInputElement;
    display.textContent=display.textContent+name.value+", ";
    name.value='';
    this.contactEmails = display.textContent
  }

  addcontact(){
    let contact = document.getElementById("contacts");
    let add = document.getElementById("add_contacts");
    add.style.display="none";
    contact.style.display="block";
    let emails = this.contactEmails.split(', ');
    emails.pop()
    console.log(emails)
    this.httpService.addContact(new Contact(emails, this.contactEmails)).subscribe(() => {
      this.contactEmails = ''
      this.contactName = ''
    })
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


  pagesNavigate(state: string) {
    let len = this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails().length;
    let next = this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails().indexOf(this.shownEmails[this.shownEmails.length-1])
    let prev = this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails().indexOf(this.shownEmails[0])
    console.log("next: "+next);
    if( ((len-1)-next)<=0 && (state == 'next') ||  prev==0 && (state == 'previous')){return;}

    for(let i = 0; i < 10; i++){
      this.shownEmails.pop();
    }
    if(state == 'current') {
      for(let i = 0; i < 10; i++) {
        if(i == len) return
        this.shownEmails.push(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails()[i]);
      }
    }
    if(state=='previous'){
      for(let i = prev-10; i < prev ; i++){
        if(i<0){break;}
        this.shownEmails.push(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails()[i]);
      }
    }
    if(state=='next'){
      for(let i = next+1; i < next+11 ; i++){
        if(i==len){break;}
        this.shownEmails.push(this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].getEmails()[i]);
      }
    }
  }

  selectAllOne(id: number) {
    let index = id + ''
    let click = document.getElementById(index) as HTMLInputElement;
    let click1 = document.getElementById("check-box");
    click.checked=true;
    this.selectedEmails.push(this.shownEmails[id])
    click1.style.display = "block";
  }

  dontSelectAllOne(id: number) {
    let index = id + ''
    let click = document.getElementById(index) as HTMLInputElement;
    let click1 = document.getElementById("check-box");
    click.checked=false;
    this.selectedEmails.pop()
    click1.style.display = "none";
  }

  select(id: number) {
    let index = id + ''
    let click = document.getElementById(index) as HTMLInputElement;
    let click1 = document.getElementById("check-box");
    if(click.checked) {
      this.check=this.check+1;
      click.checked=true;
      this.selectedEmails.push(this.shownEmails[id])
      click1.style.display = "block";
    } else {
      this.check=this.check-1;
      console.log(this.check)
      if(this.check==0) {
        click.checked=false;
        click1.style.display = "none";
      }
      this.selectedEmails.splice(this.shownEmails.indexOf(this.selectedEmails[id]),1) //////////////error
    }
  }

  //TODO add to select all button
  selectAll() {
    this.selectedEmails = []
    let click1 = document.getElementById("check-box");
    let click = document.getElementById('selectAll') as HTMLInputElement;
    if(click.checked) {
      for(let i = 0; i < this.shownEmails.length; i++) {
        this.selectAllOne(i)
      }
      this.check=this.shownEmails.length;
      click1.style.display = "block";
    } else {
      for(let i = 0; i < this.shownEmails.length; i++) {
        this.dontSelectAllOne(i)
      }
      this.check=0;
      click1.style.display = "none";
    }
  }


  moveEmailToFolder(folder: string) {
    let id = []
    for(let i = 0; i < this.selectedEmails.length; i++) {
      id.push(this.selectedEmails[i].getId())
    }
    console.log(id)
    this.httpService.move(this.emailService.currentFolder, folder, id).subscribe(() => {
      for(var i = 0 ;i <this.selectedEmails.length ;i++){ //////////////////////////?????????
        this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].removeEmail(this.selectedEmails[i])
        for(let j = 0; j < this.shownEmails.length; j++) {
          if(this.shownEmails[j].getFrom() == this.selectedEmails[i].getFrom()) { //TODO change to getId()
            this.shownEmails.splice(j, 1)
            break
          }
        }
      }
      this.selectedEmails = []
      this.check = 0;
      let click1 = document.getElementById("check-box");
      let click = document.getElementById('selectAll') as HTMLInputElement;
      click.checked=false;
      click1.style.display = 'none';
      this.pagesNavigate('current')
    })
  }
  /* moveEmailToFolder(folder: string) {
    if(this.emailService.getCurrentFolder() == 'trash') {
      //TODO send to back
    }
    //TODO send selectedEmails to back
    console.log(this.selectedEmails);
    console.log("this.check: "+this.check);
    for(var i = 0 ;i <this.selectedEmails.length ;i++){ //////////////////////////?????????
      this.shownFolders[this.emailService.names.indexOf(this.emailService.getCurrentFolder())].removeEmail(this.selectedEmails[i])
      for(let j = 0; j < this.shownEmails.length; j++) {
        if(this.shownEmails[j].getId() == this.selectedEmails[i].getId()) { //TODO change to getId() --> changed 1/5/2023
          this.shownEmails.splice(j, 1)
          break
        }
      }
    }
    this.selectedEmails = []
    this.check = 0;
    let click1 = document.getElementById("check-box");
    let click = document.getElementById('selectAll') as HTMLInputElement;
    click.checked=false;
    click1.style.display = 'none';
    this.pagesNavigate('current')
  } */

}
