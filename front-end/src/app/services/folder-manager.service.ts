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
      let folder = new Folder(this.names[i])
      this.folders.push(folder)
    }
    httpService.getFolders().subscribe((res)=>{

      for (let i=0;i<res.length;i++){
        let folder = new Folder(res[i])
        this.folders.push(folder)
        this.names.push(res[i]);
      }
    });
  }

  //get updated folders
  getFolders(): Folder[] { return this.folders }

  //add folder (observer updated)
  addFolder(name: string) {
    let folder = new Folder(name)
    this.names.push(name)
    this.folders.push(folder)
    console.log(folder.getIcon());
    //TODO send to back
    this.httpService.addFolder(name);
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
