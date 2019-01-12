import { FuseNavigation } from '@fuse/types';
   export const navigation: FuseNavigation[] = 
    [
        {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'mantenimiento',
                title    : 'MANTENIMIENTO',                
                type     : 'collapsable',
                icon     : 'album',
                children : [
                    {
                        id   : 'alumno',
                        title: 'Mantenimiento de alumnos',
                        type : 'item',
                        url      : '/Academia/Alumno',
                    },
                    {
                        id   : 'profesor',
                        title: 'Mantenimiento de docentes',
                        type : 'item',
                        url      : '/Academia/Profesor'
                    }
                ],
                badge    : {
                    title    : '2',                   
                    bg       : '#EC0C8E',
                    fg       : '#FFFFFF'
                }               
            },
            {
                id       : 'control',
                title    : 'CONTROL DE ASISTENCIA',                
                type     : 'collapsable',
                icon     : 'change_history',
                children : [
                    {
                        id   : 'Registro',
                        title: 'Registro de asistencia',
                        type : 'item',
                        url      : '/Academia/Registro'
                    },
                    {
                        id   : 'Asistencia',
                        title: 'Consulta de asistencia',
                        type : 'item',
                        url      : '/Academia/Asistencia'
                    }
                ],
                badge    : {
                    title    : '2',                   
                    bg       : '#EC0C8E',
                    fg       : '#FFFFFF'
                } 
                               
            }
        ]
    }
];
