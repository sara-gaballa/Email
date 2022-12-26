export class Folder {

  private name: string = ''

  private icon: string = ''

  private icons: string[] = ['inbox', 'send', 'draft', 'delete', 'folder'];

  setName(name: string) { this.name = name }

  getName(): string { return this.name }

  setIcon() {
    if(this.name == 'inbox')
      this.icon = this.icons[0]
    else if(this.name == 'sent')
      this.icon = this.icons[1]
    else if(this.name == 'draft')
      this.icon = this.icons[2]
    else if(this.name == 'trash')
      this.icon = this.icons[3]
    else if(this.name != '')
      this.icon = this.icon[4]
  }

  getIcon(): string { return this.icon }
}