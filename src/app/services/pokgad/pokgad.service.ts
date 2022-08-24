import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PokgadService implements CanActivate{

  constructor(
    private router: Router
    ) { }

  canActivate() : boolean{
    /*if (sessionStorage.getItem('accountid')) {
      this.router.navigate(['']);
      return false;
    } 
    return true;
    */
    console.log(sessionStorage.getItem('accountid'));
    //this.router.navigate(['']); 
    return true;
  }
}
