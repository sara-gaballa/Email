import { Email } from "./Email";

export class DraftEmail extends Email {

  setSubject(subject: string) { super.subject = subject }

  setBody(body: string) { super.body = body }

  setTo(to: string[]) { super.to = to }

}

//TODO all actions in front as if comming from back
//TODO navigation folders --> done
//TODO navigation pages
