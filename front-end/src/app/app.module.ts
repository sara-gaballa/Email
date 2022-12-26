import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { FolderComponent } from './components/folder/folder.component';
import { MailboxComponent } from './components/mailbox/mailbox.component';
import { EmailComponent } from './components/email/email.component';


@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    StartPageComponent,
    InboxComponent,
    FolderComponent,
    MailboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
