import { Contact } from "./Contact";

export class User {

  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private contacts: Contact[] = [new Contact( []) ];
  private userFolders: string[] = [];

  constructor(firstName: string, lastName: string, email: string, password: string, contacts: Contact[]) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      // this.contacts = contacts;
  }

  getFirstName(): string { return this.firstName }

  getLastName(): string { return this.lastName }

  getEmail(): string { return this.email }

  getPassword(): string { return this.password }

  getContacts(): Contact[] { return this.contacts }

  getUserFolders(): string[] { return this.userFolders }

  setFirstName(name: string) { this.firstName = name }

  setLastName(name: string) { this.lastName = name }

  setPasswordName(password: string) { this.password = password }

  setContacts(contacts: Contact[]) { this.contacts = contacts }

  setUserFolders(userFolders: string[]) { this.userFolders = userFolders }

}
