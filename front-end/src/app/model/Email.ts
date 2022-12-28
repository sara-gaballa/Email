export class Email {

  protected id: string = '';

  protected from: string = '';

  protected to: string = '';

  protected date: string = '';

  protected time: string = '';

  protected subject: string = '';

  protected body: string = '';

  // private Priority priority;

  protected attachments: string[] = [];

  constructor(id: string, from: string, to: string, date: string, time: string, subject: string, body: string) {
    this.id = id
    this.from = from
    this.to = to
    this.date = date
    this.time = time
    this.subject = subject
    this.body = body
  }

  getDate(): string { return this.date }

  getTime(): string { return this.time }

  getSubject(): string { return this.subject }

  getId(): string { return this.id }

  getFrom(): string { return this.from }

  getTo(): string { return this.to }

  getBody(): string { return this.body }

  getAttachments(): string[] { return this.attachments }

}
