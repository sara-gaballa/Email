import { Injectable } from '@angular/core';
import { Contact } from '../model/Contact';
import { Email } from '../model/Email';
import { User } from '../model/User';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';

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
      return this.http.post<void>(this.mailUrl + "signUp",user, httpOptions);
    }

    public signIn(email: string, password: string){ //done
      console.log("Sending request...");
      console.log("email:"+email+"pass:"+password);
      return this.http.get<User>(this.mailUrl + "signIn",{params:{email,password}});
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

    sendEmail(email: Email, to: string[]) {
      console.log("Sending request...");
      console.log(email);
      return this.http.post<Email>(this.mailUrl + "send", email, httpOptions);
    } //sends email on compose

    getContact(): Contact { return new Contact(["Sara", "Nancy", "Mariam"]) }

    getUser(): User { return new User("Rowaina", "Abdelnaser", "Rowainaabdelnasser@gmail.com", "Rowaina20000", []) }

    //gets current page of the passed folder
    getEMails(folder: string){
      return this.http.post<Email[]>(this.mailUrl + "getMails/" + folder, httpOptions);
    }

    //gets current page of the passed folder
    filter(criteria: string, value: string): Observable<Email[]> {
      console.log("Sending request...");
      console.log("criteria:"+criteria+" value:"+value);
      return this.http.post<Email[]>(this.mailUrl + "filter/" + criteria + "/" + value, httpOptions)
    }

    forwardEmail(email: Email, users: User[]) {} //forward to selected contacts

    logout() {}

    updateFolders(action: string, name: string) {} //add delete rename

    updateEmail(action: string, id: string) {} //add or delete email

    sort(folder: string, sort: string) {
      return this.http.post<Email[]>(this.mailUrl + "filter/" + folder + "/" + sort, httpOptions)
    } //filter is the same so prameter will handel both

}
