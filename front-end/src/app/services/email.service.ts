import { Injectable } from '@angular/core';
import { EmailHttpService } from './http.service';
import { Email } from '../model/Email';
import { Folder } from '../model/folder';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

    private folders: Folder[] = []

    currentFolder: string = 'inbox'

    //names of folders
    public names: string[] = ['inbox', 'sent', 'draft', 'trash'];

    openedEmail: Email

    private user: User

    constructor() {
      for(let i = 0; i < 4; i++) {
        let folder = new Folder(this.names[i])
        this.folders.push(folder)
      }
    }

    getFolders(): Folder[] { return this.folders }

    getCurrentFolder() { return this.currentFolder }

    setCurrentFolder(currentFolder: string) { this.currentFolder = currentFolder }

    setOpenedEmail(email: Email) { this.openedEmail = email }

    getOpenedEmail(): Email { return this.openedEmail }

    setUser(user: User) { this.user = user }

    getUser(): User { return this.user }

}
