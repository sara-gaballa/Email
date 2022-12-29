export class Email {

  protected id: string = '';

  protected from: string = '';

  protected to: string = '';

  protected date: string = '';

  protected time: string = '';

  protected subject: string = '';

  protected body: string = '';

  private Priority: string = '';

  protected attachments: string[] = [];

  constructor(from: string, to: string, date: string, time: string, subject: string, body: string, priority:string,attachments:string[]) {
    this.from = from
    this.to = to
    this.date = date
    this.time = time
    this.subject = subject
    this.body = body
    this.Priority=priority;
    this.attachments=attachments;
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
