import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit {
  n = 1;
  date = new Date();
  private anioactual: string;
  constructor() {
    this.anioactual = String(this.date).substr(8, 2);
    console.log(this.anioactual);
    // window.location.reload();
  }

  ngOnInit() {
    if (localStorage.getItem('hoy') !== this.anioactual) {
      window.location.reload();
      localStorage.setItem('hoy', this.anioactual);
    }
  }


}
