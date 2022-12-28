import { Email } from "./Email";

export class Folder {

  private name: string = ''

  private icon: string = ''

  private icons: string[] = ['inbox', 'send', 'draft', 'delete', 'folder'];

  private emails: Email[] = [] //those emails representing only current page since the rest is handeled in the back

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

  setEmails(emails: Email[]) { this.emails = emails }

  getEmails(): Email[] { return this.emails }

  addEmail(email: Email) { this.emails.unshift(email) }

  removeEmail(email: Email) { this.emails.splice(this.emails.indexOf(email), 1) }

}
