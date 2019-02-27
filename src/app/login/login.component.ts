import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { loginModel } from 'app/models/login.model';
declare var swal: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loggin: loginModel;
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
    ) {
        this.loggin = new loginModel();
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit(): void {  //quitar esto para producción
        this.loggin.user = 'administrador';
        this.loggin.password = 'Peru2019';
    }
    login() {
        this.auntSrv.attemptAuth(this.loggin).subscribe(res => {
            console.log(res);
            if (res.data === null) {
                swal('Importante', 'Credenciales incorrectos!', 'warning');
            } else {
                const accessToken = 'KJAJSKDDSAKJDAJ32424324ASDA';
                localStorage.setItem('usertoken', accessToken);
                localStorage.setItem('usuario', JSON.stringify(res));
                localStorage.setItem('menu', JSON.stringify(res.data.lstMenus));
                this.router.navigate(['Academia/Bienvenido']);
            }
        }

        )
    }
}
