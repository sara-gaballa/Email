import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FolderManagerService } from 'src/app/services/folder-manager.service';
import { FolderComponent } from '../folder/folder.component';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit{
  search: string = 'Search'
  click: string = ''
  shownFolders: FolderComponent[] = []

  constructor(private router:Router, private folders: FolderManagerService) {
    this.shownFolders = folders.getFolders()
  }

  ngOnInit(): void {

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
    /* if(page == 'trash')
      console.log("trash")
    else if(page == 'inbox')
      console.log("inbox")
    else if(page == 'draft')
      console.log("draft")
    else if(page == 'sent')
      console.log("sent") */
    console.log(page)
  }
}
