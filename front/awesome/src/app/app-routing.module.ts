import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'menu', component: MenuComponent},
  {path: 'explorer', component: ExplorerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
