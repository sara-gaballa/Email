import { Injectable } from '@angular/core';
import { EmailHttpService } from '../controller/EmailFacade';

@Injectable({
  providedIn: 'root'
})
export class EmailsManipulationService {

  constructor(private httpService: EmailHttpService) { }

  sort(folder: string, sort: string) { this.httpService.sort(folder, sort) }

  search() {}

  filter() {}
}
