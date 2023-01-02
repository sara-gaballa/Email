import { Email } from "../../model/Email";

export interface IEmailIterator {

  hasNextPage(): boolean
  hasPreviousPage(): boolean
  getNextPage(): Email[]
  getPreviousPage(): Email[]
  getCurrentPage(): Email[]
  setAllEMails(emails: Email[]): void

}
