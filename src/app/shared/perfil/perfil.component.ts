import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PerfilComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
