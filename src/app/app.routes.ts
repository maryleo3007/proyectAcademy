import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { ComponentsComponent } from './components/components.component';
import { BienvenidoComponent } from './components/configuration/bienvenido/bienvenido.component';
import { AlumnoComponent } from './components/mantenimiento/alumno/alumno.component';
import { ProfesorComponent } from './components/mantenimiento/profesor/profesor.component';
import { AuthGuard } from './core/auth.guard';
import { ControlComponent } from './components/control/registro/control.component';
import { AsistenciaComponent } from './components/control/asistencia/asistencia.component';
import { AcademyCoursesComponent } from './components/academy/courses/courses.component';
import { AcademyCourseComponent } from './components/academy/course/course.component';
import { PreguntasComponent } from './components/academy/preguntas/preguntas.component';
import { AlternativasComponent } from './components/academy/alternativas/alternativas.component';
import { NotasComponent } from './components/academy/notas/notas.component';
import { RespuestasComponent } from './components/academy/respuestas/respuestas.component';
import { PerfilComponent } from './shared/perfil/perfil.component';


const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'Academia',
        component: ComponentsComponent,
        canActivate: [AuthGuard],
        children:
            [
                { path: 'Bienvenido', component: BienvenidoComponent },
                { path: 'Perfil', component: PerfilComponent },
                { path: 'Alumno', component: AlumnoComponent },
                { path: 'Profesor', component: ProfesorComponent },
                { path: 'Registro', component: ControlComponent },
                { path: 'Asistencia', component: AsistenciaComponent },
                { path: 'Cursos', component: AcademyCoursesComponent },
                { path: 'Cursos/:id/:nombre/:time', component: AcademyCourseComponent },
                { path: 'Alternativa/:id', component: AlternativasComponent },
                { path: 'Preguntas', component: PreguntasComponent },
                { path: 'Notas', component: NotasComponent },
                { path: 'Respuestas/:id', component: RespuestasComponent },
                { path: '**', component: BienvenidoComponent }
            ]
    },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
