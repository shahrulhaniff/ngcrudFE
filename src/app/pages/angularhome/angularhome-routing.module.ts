import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AngularhomeComponent } from './angularhome.component';

const routes: Routes = [
  {
    path: '',
    component: AngularhomeComponent, 
    data: {
      title: 'WELCOME SUCCESS'
    }
  }
];

@NgModule({
  declarations: [],

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
  
export class AngularhomeRoutingModule { }
