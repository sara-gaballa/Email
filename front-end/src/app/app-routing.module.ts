import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeEmailComponent } from './components/compose-email/compose-email.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { MailBoxComponent } from './components/mail-box/mail-box.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { MailBox } from './model/Email';

const routes: Routes = [
  {
    path:'emails',
    component:InboxComponent,
  },
  {
    path:'',
    component:StartPageComponent,
  },
  {
    path:'mail-box',
    component:MailBoxComponent,
  },
  {
    path:'compose',
    component:ComposeEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
