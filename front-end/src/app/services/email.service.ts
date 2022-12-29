import { Injectable } from '@angular/core';
import { EmailHttpService } from './http.service';
import { Contact } from '../model/Contact';
import { Email } from '../model/Email';
import { Folder } from '../model/folder';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
    //Email folders
    private folders: Folder[] = []

    currentFolder: string = 'inbox'

    //names of folders
    private names: string[] = ['inbox', 'sent', 'draft', 'trash'];

    openedEmail: Email = new Email("Rowaina", "SaraNancyMariam", "12/27/2022", "11:50AM", "The Project is on fire", "GG","high",[])

    private user: User = new User("Rowaina", "Abdelanser", "Rowainaabdelansser@gamil.com", "dfvbkvfdkjvb") //current user


    constructor(private httpService: EmailHttpService) {
      for(let i = 0; i < 4; i++) {
        let folder = new Folder(this.names[i])
        this.folders.push(folder)
      }
      httpService.getFolders().subscribe((res)=>{
        for (let i=0;i<res.length;i++){
          this.folders.push(new Folder(res[i]))
          this.names.push(res[i])
        }
      });
    }

    //get updated folders
    getFolders(): Folder[] { return this.folders }

    //add folder (observer updated)
    addFolder(name: string) {
      this.folders.push(new Folder(name))
      this.names.push(name)
      this.httpService.addFolder(name);
    }

    //delete folder (observer updated)
    deleteFolder(name: string) {
      let index = this.names.indexOf(name)
      this.names.splice(index, 1)
      this.folders.splice(index, 1)
      //TODO send to back to delete
    }

    //rename folder (observer updated)
    renameFolder(before:string, after: string) {
      let index = this.names.indexOf(before)
      this.folders[index].setName(after)
      this.folders[index].setIcon()
      //TODO send to back to rename
    }

    getCurrentFolder() { return this.currentFolder }

    setCurrentFolder(currentFolder: string) {
      this.currentFolder = currentFolder
      //TODO send to back to take the required mails
    }

    /*state:
      - current: no navigation yet ie first page view
      - next: gets next page
      - previouse: gets previous page
    */
    getPageEmails(state: string) { return this.httpService.getEMails(this.getCurrentFolder(), state) }

    setOpenedEmail(email: Email) { this.openedEmail = email }

    getOpenedEmail(): Email { return this.openedEmail }

    sort(folder: string, sort: string) { this.httpService.sort(folder, sort) }

    getContact(): Contact { return this.httpService.getContact() }

    setUser(user: User) { this.user = user }

    getUser(): User { return this.user }

}
