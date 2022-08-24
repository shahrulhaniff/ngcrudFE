import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tajukbuku = 'BULUS';
  idbuku = '2';
  infoFetched = false;
  hasDataFetched = false;
  hasData = false;
  datab=null;
  
  displayForm = false;
  displayFormU = false;
  title : any;
  price : any;
  bookid2delete: any;
  bookid2update: any;
  title2u : any;
  price2u : any;

  constructor(
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.userService.getBook({bookid: this.idbuku}).subscribe((response) => {
      this.infoFetched = true;
      if (response.success === 1) {
        this.tajukbuku = response.data.title;
      }
    }); 

    this.userService.getAllBooks().subscribe((response) => {
      this.hasDataFetched = true;
      if (response.success === 1) {
        if (response.data.length > 0) {
          this.hasData = true;
        }
        this.datab = response.data;
        console.log(response.data["1"].title);
      }
    });
  }

  anakabu(){
    this.userService.pobulus();
  }
  createBook1(){
    this.displayForm=true;
  }
  createBook(){
    this.userService.createBookService({title : this.title, price : this.price}).subscribe((response) => {
      this.infoFetched = true;
      if (response.success === 1) {
        //window.location.reload();
      }
    }); 
  }
  deleteBook(bookid2delete:string){
    this.userService.deleteBookService({bookid : bookid2delete}).subscribe((response) => {
      this.infoFetched = true;
      if (response.success === 1) {
        swal("DELETED!","the book "+bookid2delete+" deleted",'success');
      }
    }); 
  }
  updateBook(bookid2update:string){
    this.userService.updateBookService({bookid2u : bookid2update,title2u : this.title2u, price2u : this.price2u}).subscribe((response) => {
      this.infoFetched = true;
      if (response.success === 1) {
        swal("UPDATED!","the book "+bookid2update+" updated",'success');
        console.log("meow update "+this.title2u , this.price2u);
      }
    }); 
  }


  /* ************** POPUP MESSAGE *************** */
  warning(msg : any) {
    swal({
      title: "Meow!",
      text: msg
    }).catch(swal.noop);
  }

  //create-data
  validationCreate(){
    const self = this;
    if ((!this.title)||(!this.price)) {
      swal("Wait!","We need a Bulus!",'error');
    }
    else{
      swal({
        title: "Confirm input : "+this.title+" and " + this.price,
        text: "BULUS BALIK",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0366fc',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(function (value) {
        if (value.value === true) {
          self.submitDataBuku();
        }
      }).catch(swal.noop);
    }
  }
  submitDataBuku() {
    this.displayForm=false;
    swal("Tom says","Leo got input of "+this.title,'success');
    this.createBook();
    window.location.reload();//not best practice, cari cara lain!!
  }

  //delete-data
  validationDelete(bookidfromhtml:string){
    this.bookid2delete = bookidfromhtml;
    const self = this;
      swal({
        title: "Confirm delete : "+bookidfromhtml,
        text: "BULUS GOMO MOLLA",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0366fc',
        cancelButtonColor: '#d33',
        confirmButtonText: 'YesMeow!'
      }).then(function (value) {
        if (value.value === true) {
          self.deleteDataBuku();
        }
      }).catch(swal.noop);
    
  }
  deleteDataBuku() {
    swal("DELETED!","Leo delete "+this.bookid2delete,'success');
    this.deleteBook(this.bookid2delete);
    window.location.reload();//not best practice, cari cara lain!!
  }

  validationUpdate(bookidfromhtml:string){
      this.bookid2update = bookidfromhtml;
      const self = this;
        swal({
          title: "To Update : "+bookidfromhtml,
          text: "BULUS BALIK MAKE"+this.title2u,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0366fc',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes Bulus Update!'
        }).then(function (value) {
          if (value.value === true) {
            self.updateDataBuku();
          }
        }).catch(swal.noop);
      
    }
    updateDataBuku() {
      swal("UPDATED!","Leo Update "+this.bookid2update,'success');
      this.updateBook(this.bookid2update);
      window.location.reload();//not best practice, cari cara lain!!
    }
  cancelfalse(){
    this.displayForm = false;
    this.displayFormU = false;
  }
  selectedHero: any;
    onSelect(user: any): void {
    this.displayFormU = true;
    this.selectedHero = user;
    this.title2u=this.selectedHero.title;
    this.price2u=this.selectedHero.price;
    console.log(this.selectedHero.id);
  }
  

  

}
