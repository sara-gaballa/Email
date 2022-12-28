export class Contact {
    name: string = ''
    email: string = ''
    emails: string[] = []

    constructor(name: string, email: string, emails: string[]) {
        this.name = name;
        this.email = email;
        this.emails = emails;
    }

    getName(): string { return this.name }

    getEmail(): string { return this.email }

    getEmails(): string[] { return this.emails }

    setName(name: string) { this.name = name }

    setEmail(email: string) { this.email = email }

    setEmails(emails: string[]) { this.emails = emails }
}
