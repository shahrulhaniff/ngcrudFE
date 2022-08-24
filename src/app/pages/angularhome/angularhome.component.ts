import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-angularhome',
  templateUrl: './angularhome.component.html',
  styleUrls: ['./angularhome.component.css']
})
export class AngularhomeComponent implements OnInit {
  title = 'Angular Home with SuperMiow';
  tajukbuku = null;
  infoFetched = false;
  idbuku = '1';

  constructor(
    private userService: UserService,
    ) { }

  ngOnInit() {
    //const payload = {bookidz:'1'}
    this.userService.getBook({bookid: this.idbuku}).subscribe((response) => {
      this.infoFetched = true;
      if (response.success === 1) {
        this.tajukbuku = response.data.title;
        console.log(this.tajukbuku, "MEOW MEOW NIGGA");
      }
    });
  }

}
