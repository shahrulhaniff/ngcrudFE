import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokgadService } from './services/pokgad/pokgad.service';
import { HomeComponent } from './pages/home/home.component';
import { UserGuardService } from './services/user-guard/user-guard.service';
//import { LoginComponent } from './pages/login/login.component'; //XPAKAI DAH SEBAB DAH ADVANCE

const routes: Routes = [

  //ni basic
  { path: 'home', component: HomeComponent },

  //ni advance
  {
    path: "login",
    canActivate: [PokgadService], 
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  { 
    path: 'angularhome', 
    canActivate: [UserGuardService], 
    loadChildren: () =>
    import("./pages/angularhome/angularhome.module").then((m)=>m.AngularhomeModule),
  },
  { 
    path: 'dashboard', 
    canActivate: [UserGuardService], 
    loadChildren: () =>
    import("./pages/dashboard/dashboard.module").then((m)=>m.DashboardModule),
  },

  
  
  // yg ni else ... selain atas tu :D
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'haha', redirectTo: 'dashboard' },
  { path: '**', redirectTo: 'dashboard' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}