import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('../app/main-screen/main-screen.module').then(mod => mod.MainScreenModule),
    // loadChildren: './main-screen/main-screen.module.ts#MainScreenModule'
  },
  {path: '', redirectTo: '/main', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
