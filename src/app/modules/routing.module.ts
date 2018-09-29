import { AddUserComponent } from './../components/add-user/add-user.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../components/list/list.component';
import { UserComponent } from '../components/user/user.component';
import { EditUserComponent } from '../components/edit-user/edit-user.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'addUser',
    component: AddUserComponent
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: UserComponent
      },
      {
        path: 'edit/:id',
        component: EditUserComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class RoutingModule { }
