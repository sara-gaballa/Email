
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../model/Contact';
import { Email } from '../model/Email';
import { User } from '../model/User';

// This can be a facad for the whole program
@Injectable()
export class EmailHttpService{

    getContact(): Contact { return new Contact("Rowaina", "rowainaabdelnasser@gmail.com", ["Sara", "Nancy", "Mariam"]) }

    getUser(): User { return new User("Rowaina", "Abdelnaser", "Rowainaabdelnasser@gmail.com", "Rowaina20000") }

    //gets current page of the passed folder
    getEMails(folder: string): Email[] { return [new Email("111", "Rokii", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG"), new Email("112", "Neso", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG"),
                                                new Email("113", "Sara", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG"), new Email("111", "Mariam", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG")]
                                        }

    sendEmail(email: Email) {} //sends email on compose

    forwardEmail(email: Email, users: User[]) {} //forward to selected contacts

    //logs out
    logout() {}
    //both sign in and log out can be merged and controlled by parameter
    //sign in
    signIn() {}

    updateFolders(action: string, name: string) {} //add delete rename

    updateEmail(action: string, id: string) {} //add or delete email
}
