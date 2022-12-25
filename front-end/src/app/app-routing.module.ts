import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DraftComponent } from './draft/draft.component';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component';
import { StartPageComponent } from './start-page/start-page.component';
import { TrashComponent } from './trash/trash.component';

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
    component:StartPageComponent,
  },
  {
    path:'draft',
    component:DraftComponent,
  },
  {
    path:'trash',
    component:TrashComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
