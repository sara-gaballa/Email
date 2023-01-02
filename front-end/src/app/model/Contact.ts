export class Contact {
    emails: string[] = []

    constructor(emails: string[]) {

        this.emails = emails;
    }
    getEmails(): string[] { return this.emails }

    setEmails(emails: string[]) { this.emails = emails }
}
