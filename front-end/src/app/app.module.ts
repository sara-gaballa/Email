import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { EmailComponent } from './components/email/email.component';
import { MailBoxComponent } from './components/mail-box/mail-box.component';
import { ComposeEmailComponent } from './components/compose-email/compose-email.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    StartPageComponent,
    InboxComponent,
    MailBoxComponent,
    ComposeEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
