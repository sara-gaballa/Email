import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { EmailComponent } from './components/email/email.component';
import { MailBoxComponent } from './components/mail-box/mail-box.component';
import { EmailHttpService } from './controller/EmailFacade';
import { EMailDataService } from './services/email-data.service';
import { FolderManagerService } from './services/folder-manager.service';
import { ComposeEmailComponent } from './components/compose-email/compose-email.component';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { UserService } from './services/user.service';
import { ContactService } from './services/contact.service';
import { LoggingService } from './services/logging.service';
import { ComposeService } from './services/compose.service';

@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    StartPageComponent,
    MailBoxComponent,
    ComposeEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    EmailHttpService,
    EMailDataService,
    FolderManagerService,
    HttpClient,
    UserService,
    ContactService,
    LoggingService,
    ComposeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
