import { Email } from "../../model/Email";
import { EmailService } from "../email.service";
import { IEmailIterator } from "./IEmailIterator";

export class EmailIterator implements IEmailIterator{

  emails: Email[] //emails of current folder
  currentPage: Email[]
  nextPage: Email[]
  previousPage: Email[]

  constructor(private emailService: EmailService) { //initially inbox
    this.setAllEMails(emailService.getAllEmails('inbox'))
  }

  getCurrentPage(): Email[] {
    return this.currentPage
  }

  hasNextPage(): boolean {
    if(this.nextPage.length == 0)
      return false
    else
      return true
  }

  hasPreviousPage(): boolean {
    if(this.previousPage.length == 0)
      return false
    else
      return true
  }

  //not tested yet
  getNextPage(): Email[] { //convert to try catch statement
    if(this.hasNextPage()) {
      this.previousPage = this.currentPage
      this.currentPage = this.nextPage
      if(this.emails.indexOf(this.nextPage[this.nextPage.length - 1]) == this.emails.length - 1) { //next contains last email
        this.nextPage = []
      } else {
        let index = this.emails.indexOf(this.nextPage[this.nextPage.length - 1]) + 1
        this.nextPage = []
        for(let i = index; i < index + 10; i++) {
          if(this.emails.length - i - 1 > 0) {
            this.nextPage.push(this.emails[i])
          } else {
            break
          }
        }
      }
    }
    else {
      console.log('error!')
    }
    return this.currentPage
  }

  //not tested yet
  getPreviousPage(): Email[] { //convert to try catch statement
    if(this.hasPreviousPage()) {
      this.nextPage = this.currentPage
      this.currentPage = this.previousPage
      if(this.emails.indexOf(this.previousPage[0]) == 0) { //first page
        this.previousPage = []
      } else {
        let index = this.emails.indexOf(this.previousPage[0]) - 1
        this.previousPage = []
        for(let i = index - 9; i >= index; i++) {
          this.previousPage.push(this.emails[i])
        }
      }
    }
    else {
      console.log('error!')
    }
    return this.currentPage
  }

  setAllEMails(emails: Email[]): void { //initializes the iterator, each page contains maximum 10 emails
    this.emails = emails
    this.previousPage = []
    this.currentPage = []
    this.nextPage = []
    for(let i = 0; i < emails.length; i++) {
      if(i < 10 && emails.length - i - 1 > 0)
        this.currentPage.push(emails[i])
      else if(i < 20 && i >= 10 && emails.length - i - 1 > 0) {
        this.nextPage.push(emails[i])
      }
    }
  }

}
