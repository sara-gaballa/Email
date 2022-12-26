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

  private name: string = ''

  private icon: string = ''

  private icons: string[] = ['inbox', 'send', 'draft', 'delete', 'folder'];

  setName(name: string) { this.name = name }

  getName(): string { return this.name }

  getIcon(): string {
    if(this.name == 'inbox')
      return this.icons[0]
    if(this.name == 'sent')
      return this.icons[1]
    if(this.name == 'draft')
      return this.icons[2]
    if(this.name == 'trash')
      return this.icons[3]
    else
      return this.icon[4]
  }

}
