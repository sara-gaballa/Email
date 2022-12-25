import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmailComponent } from './email/email.component';
import { StartPageComponent } from './start-page/start-page.component';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    StartPageComponent,
    InboxComponent,
    SentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
