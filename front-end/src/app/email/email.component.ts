import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  search:string|null='Search'
  click:string|null=''

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  change(s:string):void{
    this.search=s;
  }

  show_hide_profile() {
    var click = document.getElementById("profile-content");
      if(click!=null&&click.style.display ==="none") {
          click.style.display ="block";
       } else  if(click!=null){
          click.style.display ="none";
       } 
    }

}
