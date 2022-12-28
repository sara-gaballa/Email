export class Email {

  private id: string = '';

  private from: string = '';

  private to: string = '';

  private date: string = '';

  private time: string = '';

  private subject: string = '';

  private body: string = '';

  // private Priority priority;

  private attachments: string[] = [];

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
