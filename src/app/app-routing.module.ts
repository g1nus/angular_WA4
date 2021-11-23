import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberListComponent } from './member-list/member-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'member-create'},
  { path: 'member-create', component: MemberCreateComponent},
  { path: 'member-list', component: MemberListComponent },
  { path: 'member-edit/:id', component: MemberEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
