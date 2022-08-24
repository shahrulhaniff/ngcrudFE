import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(
    private router : Router
  ) { }

  canActivate() : boolean{
    /*if (sessionStorage.getItem('accountid')) {
      this.router.navigate(['']);
      return false;
    } 
    return true;
    */
    console.log('session: ',sessionStorage.getItem('accountid'));
    //this.router.navigate(['']); 
    return true;
  }
  
}
