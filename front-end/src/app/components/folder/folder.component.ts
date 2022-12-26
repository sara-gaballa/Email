import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  private name: string = 'Hello'

  setName(name: string) { this.name = name }

  getName(): string { return this.name }
}
