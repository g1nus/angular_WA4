import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberListComponent } from './member-list/member-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'member-list'},
  { path: 'member-list', component: MemberListComponent },
  { path: 'member-details/:id', component: MemberDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
