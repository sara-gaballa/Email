import { Injectable } from '@angular/core';
import { EmailHttpService } from './http.service';
import { Email } from '../model/Email';
import { Folder } from '../model/folder';
import { User } from '../model/User';
import { EmailIterator } from './email-iterator/EmailItirator';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

    //Email folders
    //singleton
    private folders: Folder[] = []

    //singleton
    currentFolder: string = 'inbox'

    //singleton
    public names: string[] = ['inbox', 'sent', 'draft', 'trash']; //only used to access folder not more or less

    //singleton
    openedEmail: Email = new Email("" ,"Rowaina", "SaraNancyMariam", "12/27/2022", "11:50AM", "The Project is on fire", "GG","high",[])

    //singleton
    private user: User = new User("Rowaina", "Abdelanser", "Rowainaabdelansser@gamil.com", "dfvbkvfdkjvb", []) //current user

    //singleton
    public emailIterator: EmailIterator

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
     
    delete(){

    }

    getCurrentFolder() { return this.currentFolder }

    setCurrentFolder(currentFolder: string) {
      this.currentFolder = currentFolder
      if(this.folders[this.names.indexOf(currentFolder)].getEmails().length == 0) {/*TODO send to back to take the required mails*/}
    }

    getAllEmails(folder: string): Email[] {
      return this.folders[this.names.indexOf(folder)].getEmails()
    }

    getPageEmails(state: string): Email[] {
      if(state === 'current') {
        return this.emailIterator.getCurrentPage()
      }
      return this.folders[this.names.indexOf(this.currentFolder)].getEmails()
    }

    setOpenedEmail(email: Email) { this.openedEmail = email }

    getOpenedEmail(): Email { return this.openedEmail }

    setUser(user: User) { this.user = user }

    getUser(): User { return this.user }

}
