import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  search:string|null='Search'
  click:string|null=''

  constructor(private router:Router) { }

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
}
