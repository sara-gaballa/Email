import { Email } from "./Email";

export class DraftEmail extends Email {

  setSubject(subject: string) { super.subject = subject }

  setBody(body: string) { super.body = body }

  setTo(to: string) { super.to = to }

}
