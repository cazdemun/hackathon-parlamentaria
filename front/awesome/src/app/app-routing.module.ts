import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'menu', component: MenuComponent},
  {path: 'explore', component: ExploreComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
