import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  search:string|null='Search'

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  change(s:string):void{
    this.search=s;
  }
}
