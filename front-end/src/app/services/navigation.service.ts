import { Injectable } from '@angular/core';
import { EmailHttpService } from '../controller/EmailFacade';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private httpService: EmailHttpService) { }

  logout() { this.httpService.logout() }

}
