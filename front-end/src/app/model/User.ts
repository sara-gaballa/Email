export class User {

  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private contacts: string[];
  private userFolders: string[] = [];

  constructor(firstName: string, lastName: string, email: string, password: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.contacts = [];
  }

  getFirstName(): string { return this.firstName }

  getLastName(): string { return this.lastName }

  getEmail(): string { return this.email }

  getPassword(): string { return this.password }

  getContacts(): string[] { return this.contacts }

  getUserFolders(): string[] { return this.userFolders }

  setFirstName(name: string) { this.firstName = name }

  setLastName(name: string) { this.lastName = name }

  setPasswordName(password: string) { this.password = password }

  setContacts(contacts: string[]) { this.contacts = contacts }

  setUserFolders(userFolders: string[]) { this.userFolders = userFolders }

}
