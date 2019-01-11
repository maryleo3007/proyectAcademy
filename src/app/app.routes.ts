import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ComponentsComponent } from './components/components.component';
// import { AuthGuard } from './core/auth.guard'
// import { SampleModule } from 'app/main/sample/sample.module';
import { SampleComponent } from './main/sample/sample.component';
import { BienvenidoComponent } from './components/configuration/bienvenido/bienvenido.component';
import { AlumnoComponent } from './components/mantenimiento/alumno/alumno.component';
import { ProfesorComponent } from './components/mantenimiento/profesor/profesor.component';
import { AuthGuard } from './core/auth.guard';
import { ControlComponent } from './components/control/registro/control.component';
import { AsistenciaComponent } from './components/control/asistencia/asistencia.component';


const appRoutes: Routes = [ 
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { 
        path: 'Academia', 
        component: ComponentsComponent,
        canActivate: [AuthGuard],       
        children: 
        [        
            { path: 'Bienvenido', component: BienvenidoComponent  , data: { titulo: 'Bienvenidos' }}, 
            { path: 'Alumno', component: AlumnoComponent  , data: { titulo: 'Alumnos' }}, 
            { path: 'Profesor', component: ProfesorComponent  , data: { titulo: 'Profesores' }}, 
            { path: 'Registro', component: ControlComponent  , data: { titulo: 'Registro' }}, 
            { path: 'Asistencia', component: AsistenciaComponent  , data: { titulo: 'Asistencia' }}, 
            // { path: '**', component: NopagefoundComponent }
          ]      
      },
  ];
  
  export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
  