import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'mantenimiento',
                title    : 'Mantenimiento',                
                type     : 'collapsable',
                icon     : 'album',
                children : [
                    {
                        id   : 'alumno',
                        title: 'Alumno',
                        type : 'item',
                        url      : '/Academia/Alumno',
                    },
                    {
                        id   : 'profesor',
                        title: 'Profesor',
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
                title    : 'Control',                
                type     : 'collapsable',
                icon     : 'change_history',
                children : [
                    {
                        id   : 'Registro',
                        title: 'Registro',
                        type : 'item',
                        url      : '/Academia/Registro'
                    },
                    {
                        id   : 'Asistencia',
                        title: 'Asistencia',
                        type : 'item',
                        url      : '/Academia/Asistencia'
                    }
                ],
                               
            }
        ]
    }
];
