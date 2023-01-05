export class Contact {
    emails: string[] = []
    name: string = ''

    constructor(emails: string[], name: string) {
        this.name = name
        this.emails = emails;
    }
    getEmails(): string[] { return this.emails }

    setEmails(emails: string[]) { this.emails = emails }

    getName(): string { return this.name }

    setName(name: string) { this.name = name }

    addEmail(email: string): string[] { this.emails.push(email); return this.emails }
}
