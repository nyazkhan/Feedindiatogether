import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NeedyFormComponent } from './module/needy-form/needy-form.component';
import { NeedHelpComponent } from './component/form/need-help/need-help.component';
import { HomeComponent } from './component/home/home.component';
import { IWantToHelpComponent } from './component/form/i-want-to-help/i-want-to-help.component';


const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'needy', component: NeedyFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'people-need-help', component: NeedHelpComponent },
  { path: 'i-want-to-help', component: IWantToHelpComponent },

  {
    path: 'map',
    loadChildren: () => import('./module/main/map/map.module').then(m => m.MapModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
