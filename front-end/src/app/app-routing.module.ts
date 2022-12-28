import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeEmailComponent } from './components/compose-email/compose-email.component';
import { EmailComponent } from './components/email/email.component';
import { MailBoxComponent } from './components/mail-box/mail-box.component';
import { StartPageComponent } from './components/start-page/start-page.component';

const routes: Routes = [
  {
    path:'emails',
    component:EmailComponent,
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
