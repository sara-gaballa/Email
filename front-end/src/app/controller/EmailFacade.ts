
import { Injectable } from '@angular/core';
import { Contact } from '../model/Contact';
import { Email } from '../model/Email';
import { User } from '../model/User';

// This can be a facad for the whole program
@Injectable()
export class EmailHttpService{

    getContact(): Contact { return new Contact("Rowaina", "rowainaabdelnasser@gmail.com", ["Sara", "Nancy", "Mariam"]) }

    getUser(): User { return new User("Rowaina", "Abdelnaser", "Rowainaabdelnasser@gmail.com", "Rowaina20000") }

    //gets current page of the passed folder
    getEMails(folder: string, state: string): Email[] { return [new Email("111", "Rokii", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG"), new Email("112", "Neso", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG"),
                                                new Email("113", "Sara", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG"), new Email("111", "Mariam", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG")]
                                        }

    sendEmail(email: Email) {} //sends email on compose

    forwardEmail(email: Email, users: User[]) {} //forward to selected contacts

    logout() {}

    signIn(email: string, password: string) { /*signIn in back*/ }

    signUp(userName: string, email: string, password: string) { /*signUp in back*/ }

    updateFolders(action: string, name: string) {} //add delete rename

    updateEmail(action: string, id: string) {} //add or delete email

    sort(folder: string, sort: string) {} //filter is the same so prameter will handel both
}
