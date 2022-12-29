import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { EmailComponent } from './components/email/email.component';
import { MailBoxComponent } from './components/mail-box/mail-box.component';
import { EmailHttpService } from './services/http.service';
import { ComposeEmailComponent } from './components/compose-email/compose-email.component';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { EmailService } from './services/email.service';

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
    HttpClient,
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
