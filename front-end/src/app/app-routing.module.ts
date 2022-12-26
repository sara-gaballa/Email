import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './components/inbox/inbox.component';
import { StartPageComponent } from './components/start-page/start-page.component';

const routes: Routes = [
  {
    path:'emails',
    component:InboxComponent,
  },
  {
    path:'',
    component:StartPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
