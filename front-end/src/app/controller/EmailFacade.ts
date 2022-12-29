
import { Injectable } from '@angular/core';
import { Contact } from '../model/Contact';
import { Email } from '../model/Email';
import { User } from '../model/User';
import {HttpClient, HttpHeaders} from "@angular/common/http";

// This can be a facad for the whole program
const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
  })
};
@Injectable()
export class EmailHttpService{

  private mailUrl: string;

    constructor(private http: HttpClient) {
      this.mailUrl = 'http://localhost:8084/mail/';
    }

    public signUp(user: User){ //done
      console.log("Sending request...");
      console.log(user);
      return this.http.post<void>(this.mailUrl + "signUp",user, httpOptions).subscribe();
    }

    public signIn(email: string, password: string){ //done
      console.log("Sending request...");
      console.log("email:"+email+"pass:"+password);
      return this.http.get<void>(this.mailUrl + "signIn",{params:{email,password}}).subscribe();
    }

    public addFolder(name:string){
      console.log("Sending request...");
      console.log("name of the folder: "+name);
      return this.http.get<void>(this.mailUrl + "addFolder",{params:{name}}).subscribe();
    }

    public getFolders() {
      console.log("Sending request...");
      console.log("name of the folder: "+name);
      return this.http.get<string[]>(this.mailUrl + "getFolders",httpOptions);
    }

    sendEmail(email: Email) {
      console.log("Sending request...");
      console.log(email);
      return this.http.post<void>(this.mailUrl + "compose",email, httpOptions).subscribe();

    } //sends email on compose

    getContact(): Contact { return new Contact("Rowaina", "rowainaabdelnasser@gmail.com", ["Sara", "Nancy", "Mariam"]) }

    getUser(): User { return new User("Rowaina", "Abdelnaser", "Rowainaabdelnasser@gmail.com", "Rowaina20000") }

    //gets current page of the passed folder
    getEMails(folder: string, state: string): Email[] { return [new Email("111", "Rokii", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", []), new Email("112", "Neso", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", []),
                                                new Email("113", "Sara", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", []), new Email("111", "Mariam", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", [])]
                                        }



    forwardEmail(email: Email, users: User[]) {} //forward to selected contacts

    logout() {}

    updateFolders(action: string, name: string) {} //add delete rename

    updateEmail(action: string, id: string) {} //add or delete email

    sort(folder: string, sort: string) {} //filter is the same so prameter will handel both

}
