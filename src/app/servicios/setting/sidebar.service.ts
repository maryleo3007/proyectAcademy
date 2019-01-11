import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
    menu: any = [          
          {
            order : 1,
            name	: 'ADMINISTRACION',            
            icon	: 'font email',
            submenu : [
              {
                order : 1,
                name	: 'MANTENIMIENTO DE ALUMNOS',
                url	: '/mantenimiento/alumnos'                
              },
              {
                order : 2,
                name	: 'MANTENIMIENTO DE DOCENTES',
                url	: '/mantenimiento/docentes',                
              }
            ]
          },	
          {
            order : 2,
            name	: 'CONTROL ASISTENCIA',            
            icon	: 'font email',
            submenu : [
              {
                order : 1,
                name	: 'CONTROL ASISTENCIA ALUMNOS',
                url	: '/asistencia/alumnos'                
              },
              {
                order : 2,
                name	: 'CONTROL ASISTENCIA DOCENTES',
                url	: '/asistencia/docentes'                
              }
            ]
          },
          {
            order : 3,
            name	: 'NOTAS',            
            icon	: 'font email',
            submenu : null
          }
      ]; 
      constructor() { }
    
}
