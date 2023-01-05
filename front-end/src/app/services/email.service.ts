import { Injectable } from '@angular/core';
import { EmailHttpService } from './http.service';
import { Email } from '../model/Email';
import { Folder } from '../model/folder';
import { User } from '../model/User';

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
    openedEmail: Email
    //singleton
    private user: User

    constructor(private httpService: EmailHttpService) {
      for(let i = 0; i < 4; i++) {
        let folder = new Folder(this.names[i])
        this.folders.push(folder)
      }

      // httpService.getFolders().subscribe((res)=>{
      //   for (let i=0;i<res.length;i++){
      //     this.folders.push(new Folder(res[i]))
      //     this.names.push(res[i])
      //   }
      // });
    }

    clear() {
      this.folders = []
      if(this.names.length > 4) {
        for(let i = 4; i < this.names.length; i++)
          this.names.pop()
      }
    }

    getAllEmails(folder: string): Email[] {
      return this.folders[this.names.indexOf(folder)].getEmails()
    }

    setFolders() {
      /* if(this.user.getUserFolders() != null){
        for(let i = 4; i < this.user.getUserFolders().length; i++) {
          let folder = new Folder(this.names[i])
          this.folders.push(folder)
        }
      } */
      console.log(this.user)
    }

    //get updated folders
    getFolders(): Folder[] { return this.folders }


    getCurrentFolder() { return this.currentFolder }

    setCurrentFolder(currentFolder: string) { this.currentFolder = currentFolder }

    setOpenedEmail(email: Email) { this.openedEmail = email }

    getOpenedEmail(): Email { return this.openedEmail }

    setUser(user: User) {
      console.log(user);
      this.user = user
    }

    getUser(): User { return this.user }

}
