export class MailBox {

  private date: string = '';
  private time: string = '';
  private subject: string = '';

  getDate(): string { return this.date }

  getTime(): string { return this.time }

  getSubject(): string { return this.subject }

  setDate(date: string) { this.date = date }

  setTime(time: string) { this.time = time }

  setSubject(subject: string) { this.subject = subject }

}
