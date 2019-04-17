import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit {
  n = 1;
  constructor() {
    // window.location.reload();
  }

  ngOnInit() {
    // if (this.n === 1) {
    //   window.location.reload();
    //   this.n = 0;
    // }
  }
  // relojear() {
  //   if(this.n===1) {
  //     window.location.reload();
  //     this.n=0;
  //   }


  // }

}
