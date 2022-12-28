import { Injectable } from '@angular/core';
import { EmailHttpService } from '../controller/EmailFacade';
import { Folder } from '../model/Folder';

//observer
@Injectable({
  providedIn: 'root'
})
export class FolderManagerService {

  //Email folders
  private folders: Folder[] = []

  currentFolder: string = 'inbox'

  //names of folders
  private names: string[] = ['inbox', 'sent', 'draft', 'trash'];

  constructor(private httpService: EmailHttpService) {
    //TODO take all extra folders from back
    for(let i = 0; i < 4; i++) {
      let folder = new Folder()
      folder.setName(this.names[i])
      folder.setIcon()
      this.folders.push(folder)
    }
  }

  //get updated folders
  getFolders(): Folder[] { return this.folders }

  //add folder (observer updated)
  addFolder(name: string) {
    let folder = new Folder()
    this.names.push(name)
    folder.setName(name)
    folder.setIcon()
    this.folders.push(folder)
    //TODO send to back
  }

  //delete folder (observer updated)
  deleteFolder(name: string) {
    let index = this.names.indexOf(name)
    this.names.splice(index, 1)
    this.folders.splice(index, 1)
    //TODO send to back
  }

  //rename folder (observer updated)
  renameFolder(before:string, after: string) {
    let index = this.names.indexOf(before)
    this.folders[index].setName(after)
    this.folders[index].setIcon()
    //TODO send to back
  }

  getCurrentFolder() { return this.currentFolder }

  setCurrentFolder(currentFolder: string) { this.currentFolder = currentFolder }

}
