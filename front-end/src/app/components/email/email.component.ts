import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Folder } from 'src/app/model/folder';
import { FolderManagerService } from 'src/app/services/folder-manager.service';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  search: string = 'Search'
  click: string = ''
  shownFolders: Folder[] = []

  constructor(private router:Router, private folders: FolderManagerService) {
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

  addFolder(newFolder: string) {
    this.folders.addFolder(newFolder)
    this.folders.getFolders()
  }
}
