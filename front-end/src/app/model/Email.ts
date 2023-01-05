export class Email {

  protected id: string = '';

  protected from: string = '';

  protected to: string[] = [];

  protected date: string = '';

  protected time: string = '';

  protected subject: string = '';

  protected body: string = '';

  private priority: string = '';

  protected attachments: string[] = [];

  constructor(id: string, from: string, to: string[], date: string, time: string, subject: string, body: string, priority:string,attachments:string[]) {
    this.from = from
    this.to = to
    this.date = date
    this.time = time
    this.subject = subject
    this.body = body
    this.priority=priority
    this.id = id
    this.attachments=attachments
  }
  setID(id:string){this.id=id; }

  getDate(): string { return this.date }

  getTime(): string { return this.time }

  getSubject(): string { return this.subject }

  getId(): string { return this.id }

  getFrom(): string { return this.from }

  getTo(): string[] { return this.to }

  getBody(): string { return this.body }

  getAttachments(): string[] { return this.attachments }

  getPriority(): string { return this.priority }

}
