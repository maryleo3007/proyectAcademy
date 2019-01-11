import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
declare var swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class LoginComponent implements OnInit 
{
    email: string ='feliz@gmail.com';
    password: any ='123456';
  loginForm: FormGroup;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      private router: Router,
      private auntSrv: AuthService
  )
  {
      // Configure the layout
      this._fuseConfigService.config = {
          layout: {
              navbar   : {
                  hidden: true
              },
              toolbar  : {
                  hidden: true
              },
              footer   : {
                  hidden: true
              },
              sidepanel: {
                  hidden: true
              }
          }
      };
  }
 
  ngOnInit(): void
  {      
  }
  login (username,password) {
    this.auntSrv.attemptAuth(username,password).subscribe(res => {
        const accessToken = 'KJAJSKDDSAKJDAJ32424324ASDA';
        localStorage.setItem('usertoken', accessToken);
        localStorage.setItem('usuario', JSON.stringify(res));
        console.log(res);        
        this.router.navigate(['Academia/Bienvenido']);
    },
    error => {        
        swal('Importante', 'Credenciales incorrectos!', 'warning');     
      }  

    )
  }
}