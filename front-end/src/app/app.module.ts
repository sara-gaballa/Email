import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmailComponent } from './email/email.component';
import { StartPageComponent } from './start-page/start-page.component';
import { InboxComponent } from './email-pages/inbox/inbox.component';
import { SentComponent } from './email-pages/sent/sent.component';
import { DraftComponent } from './email-pages/draft/draft.component';
import { TrashComponent } from './email-pages/trash/trash.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    StartPageComponent,
    InboxComponent,
    SentComponent,
    DraftComponent,
    TrashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
