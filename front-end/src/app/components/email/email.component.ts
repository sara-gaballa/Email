import { Component, OnInit } from '@angular/core';
import { EmailHttpService } from 'src/app/services/http.service';
import { Contact } from 'src/app/model/Contact';
import { Email } from 'src/app/model/Email';
import { Folder } from 'src/app/model/folder';
import { User } from 'src/app/model/User';
import { EmailService } from 'src/app/services/email.service';
import { EmailIterator } from 'src/app/services/email-iterator/EmailItirator';
import {Router} from "@angular/router";

//observable and all services observers except EmailHttpService is the facade for our program
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  check:number=0;
  click: string = ''
  shownFolders: Folder[] = []
  shownEmails: Email[] = []
  selectedEmails: Email[] = []
  contacts: Contact[]
  allSelected: boolean = false
  //singleton
  public emailIterator: EmailIterator

  constructor(private httpService: EmailHttpService, private emailService: EmailService,private  route:Router) {
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
  //   this.search = s;
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




  search(){
    let data = document.getElementById("searchData") as HTMLInputElement;
    let type = document.getElementById("search") as HTMLFormElement;
    let t: FormData;
    t = new FormData(type);


    this.httpService.search(t.getAll('type') as string[],data.value).subscribe(res => {
      console.log("sent successfully")
      this.shownEmails = []
      for (let i = 0; i < res.length; i++) {
        this.shownEmails.push(new Email(res[i]["id"], res[i]["from"], res[i]["to"], res[i]["date"], res[i]["time"], res[i]["subject"], res[i]["body"], res[i]["Priority"], res[i]["attachments"]));
        console.log(res[i])
      }
    })
    console.log(data.value, t.getAll('type'));
  }
  //TODO add to select all button

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
    let display1 = document.getElementById("enteredemail");
    let display2 = document.getElementById("enteredname");
    display1.textContent='';
    display2.textContent='';
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
    if(this.emailService.getCurrentFolder() == 'trash') {
      //TODO send to back
    }
    //TODO send selectedEmails to back
    console.log(this.selectedEmails);
    console.log("this.check: "+this.check);
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
  }
}
