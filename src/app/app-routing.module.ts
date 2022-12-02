import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { PagesRouingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: NopagefoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRouingModule,
    AuthRoutingModule,
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
