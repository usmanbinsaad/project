import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [
  { path: '**', redirectTo: '' },
  {
    path: '',
    component: NavComponent,
    children: [
      { path: 'useradd', component: UserAddComponent, pathMatch: 'full' },
      { path: 'userview', component: UserViewComponent, pathMatch: 'full' },
    ],
  },

  { path: 'useradd', component: UserAddComponent, pathMatch: 'full' },
  { path: 'userview', component: UserViewComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [
  UserAddComponent,
  UserAddComponent,
  NavComponent,
];
