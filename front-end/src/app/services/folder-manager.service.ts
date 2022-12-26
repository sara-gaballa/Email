import { Injectable } from '@angular/core';
import { FolderComponent } from '../components/folder/folder.component';

@Injectable({
  providedIn: 'root'
})
export class FolderManagerService {

  private folders: FolderComponent[] = [];
  private names: string[] = ['inbox', 'sent', 'draft', 'trash'];
  private folder = new FolderComponent()

  constructor() {
    //TODO take all extra folders from back
    for(let i = 0; i < 4; i++) {
      this.folder.setName(this.names[i])
      this.folders.push(this.folder)
    }
  }

  //get updated folders
  getFolders(): FolderComponent[] { return this.folders }

  //add folder (observer updated)
  addFolder(name: string) {
    this.names.push(name)
    this.folder.setName(name)
    this.folders.push(this.folder)
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
    this.names[index] = after
    this.folder = this.folders[index]
    this.folder.setName(after)
    this.folders[index] = this.folder
    //TODO send to back
  }

}
