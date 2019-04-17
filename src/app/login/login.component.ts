import { FuseNavigation } from './../../@fuse/types/fuse-navigation';
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
    newnavigate: FuseNavigation[];
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

        this.newnavigate =
            [
                {
                    id: 'applications',
                    title: 'Academia',
                    translate: 'NAV.APPLICATIONS',
                    type: 'group',
                    icon: 'apps',
                    children: [
                        {
                            id: 'mantenimiento',
                            title: 'MANTENIMIENTO',
                            type: 'collapsable',
                            icon: 'album',
                            children: [
                                {
                                    id: 'alumnos',
                                    title: 'Mantenimiento de alumnos',
                                    type: 'item',
                                    url: '/Academia/Alumno',
                                },
                                {
                                    id: 'profesor',
                                    title: 'Mantenimiento de docentes',
                                    type: 'item',
                                    url: '/Academia/Profesor'
                                }
                            ],
                            badge: {
                                title: '2',
                                bg: '#F44336',
                                fg: '#FFFFFF'
                            }
                        },
                        {
                            id: 'control',
                            title: 'CONTROL DE ASISTENCIA',
                            type: 'collapsable',
                            icon: 'change_history',
                            children: [
                                {
                                    id: 'registro',
                                    title: 'Registro de asistencia',
                                    type: 'item',
                                    url: '/Academia/Registro'
                                },
                                {
                                    id: 'asistencia',
                                    title: 'Control de asistencia',
                                    type: 'item',
                                    url: '/Academia/Asistencia'
                                }
                            ],
                            badge: {
                                title: '2',
                                bg: '#09d261',
                                fg: '#FFFFFF'
                            }

                        },
                        {
                            id: 'cursos',
                            title: 'CURSOS',
                            type: 'collapsable',
                            icon: 'cast_for_education',
                            children: [
                                {
                                    id: 'cusos1',
                                    title: 'Cursos',
                                    type: 'item',
                                    url: '/Academia/Cursos'
                                },
                                {
                                    id: 'cusos2',
                                    title: 'Mantenimiento',
                                    type: 'item',
                                    url: '/Academia/Preguntas'
                                }
                            ],
                            badge: {
                                title: '2',
                                bg: '#525e8a',
                                fg: '#FFFFFF'
                            }

                        }
                    ]
                }
            ];



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
            // console.log(res);
            if (res.data === null) {
                swal('Importante', 'Credenciales incorrectos!', 'warning');
            } else {
                const accessToken = 'KJAJSKDDSAKJDAJ32424324ASDA';
                localStorage.setItem('usertoken', accessToken);
                localStorage.setItem('usuario', JSON.stringify(res));
                // localStorage.setItem('menu', JSON.stringify(res.data.lstMenus));

                localStorage.setItem('menu', JSON.stringify(this.newnavigate));


                this.router.navigate(['Academia/Bienvenido']);
            }
        }

        )
    }
}
