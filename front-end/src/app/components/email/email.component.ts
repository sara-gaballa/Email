import { Component } from '@angular/core';
import { Folder } from 'src/app/model/folder';
import { FolderManagerService } from 'src/app/services/folder-manager.service';

//observable
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  search: string = 'Search'
  click: string = ''
  shownFolders: Folder[] = []

  constructor(private folders: FolderManagerService) {
    this.shownFolders = folders.getFolders()
  }

  change(s:string):void{
    this.search=s;
  }

  show_hide_profile() {
    let click = document.getElementById("profile-content");
      if(click != null && click.style.display === "none") {
          click.style.display = "block";
      } else if(click != null){
          click.style.display = "none";
      }
  }

  navigate(page: string) {
    console.log(page)
  }
  addfolder(){
    let name=document.getElementById("FolderName") as HTMLInputElement ;
    if(name?.value!=''){
      this.folders.addFolder(name?.value)
      this.folders.getFolders()
      let click = document.getElementById("NewFolder");
      click!.style.display = "none";
    }
    name.value='';
  }
  openWindow() {
    let click = document.getElementById("NewFolder");
    if(click != null && click.style.display === "none") {
        click.style.display = "block";
    } else if(click != null){
        click.style.display = "none";
    }
  }
}