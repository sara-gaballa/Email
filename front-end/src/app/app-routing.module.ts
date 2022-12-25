import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  {
    path:'sent',
    component:SentComponent,
  },
  {
    path:'inbox',
    component:InboxComponent
  },
  {
    path:'',
    component:StartPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
