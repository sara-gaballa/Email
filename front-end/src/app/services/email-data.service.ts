import { Injectable } from '@angular/core';
import { RemoteProxyService } from '../controller/remote-proxy.service';
import { FolderManagerService } from './folder-manager.service';


//Mail mediator
@Injectable({
  providedIn: 'root'
})
export class EMailDataService {

  /* private mails: Map<string, MailBox[]>; */

  constructor(private remoteProxy: RemoteProxyService, private folders: FolderManagerService) {
    //TODO take extra mails from back
    for(let i = 0; i < 4; i++) {
      //TODO subscribe all essential mails form back
    }
  }

  deleteMail(folderName: string, id: number) {
    if(folderName != 'trash') {
      //TODO add mail to trash
      //TODO send to back
    }
    else {
      //TODO delete mail premenantly
      //TODO send to back
    }
  }

  addMail(folderName: string) {}

}
