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
      this.mailUrl = 'http://localhost:8085/mail/';
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
      return this.http.get<void>(this.mailUrl + "addFolder",{params:{name}});
    }

    public renameFolder(oldName: string, newName: string){
      return this.http.put<void>(this.mailUrl + "renameFolder", {params:{oldName, newName}});
    }

    public deleteFolder(name: string){
      return this.http.delete<void>(this.mailUrl + "deleteFolder", {params:{name}});
    }

    // public getFolders() {
    //   console.log("Sending request...");
    //   console.log("name of the folder: "+name);
    //   return this.http.get<string[]>(this.mailUrl + "getFolders",httpOptions);
    // }

    sendEmail(email: Email) {
      console.log("Sending request...");
      console.log(email);
      return this.http.post<Email>(this.mailUrl + "send", email, httpOptions);
    } //sends email on compose

    //gets current page of the passed folder
    getEMails(folder: string){
      return this.http.get<Email[]>(this.mailUrl + "getMails" + {params:{folder}});
    }

    deleteMails(folder: string, ids: string[]){
      return this.http.delete<void>(this.mailUrl + "delete", {params:{folder, ids}});
    }

    //gets current page of the passed folder
    filter(criteria: string, value: string): Observable<Email[]> {
      console.log("Sending request...");
      console.log("criteria:"+criteria+" value:"+value);
      return this.http.post<Email[]>(this.mailUrl + "filter/" + criteria + "/" + value, httpOptions)
    }

    move(from: string, to: string, ids: string[]){
      return this.http.put<void>(this.mailUrl + "move", {params:{from, to, ids}});
    }

    forwardEmail(email: Email, users: User[]) {} //forward to selected contacts

    logout() {
      return this.http.get<void>(this.mailUrl + "signOut");
    }

    sort(attribute: string) {
      return this.http.get<Email[]>(this.mailUrl + "sort", {params:{attribute}})
    } //filter is the same so prameter will handel both

    sortByPriority() {
      return this.http.get<Email[]>(this.mailUrl + "priority");
    } //
    search(attributes: string[], value: string){
      return this.http.get<Email[]>(this.mailUrl + "search", {params:{attributes, value}});
    }

    addContact(contact: Contact){
      return this.http.post<void>(this.mailUrl + "addContact", contact);
    }

    editContact(name: string, contact: Contact){
      return this.http.put<void>(this.mailUrl + "editContact/" + name, contact);
    }

    deleteContact(name: string){
      return this.http.delete<void>(this.mailUrl + "deleteContact/" + name);
    }

    searchContacts(attribute: string, value: string){
      return this.http.get<Contact[]>(this.mailUrl + "searchContact", {params:{attribute, value}});
    }

    sortContacts(name: string){
      return this.http.get<Contact[]>(this.mailUrl + "sortContacts");
    }

    openAttachment(name: string){
      return this.http.get<void>(this.mailUrl + "open", {params:{name}});
    }

}
