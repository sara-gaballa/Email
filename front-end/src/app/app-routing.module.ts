import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [

  {
    path:'mail',
    component:EmailComponent
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
