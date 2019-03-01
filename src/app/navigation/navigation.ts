import { FuseNavigation } from '@fuse/types';
export const navigation: FuseNavigation[] =
    [
        {
            id: 'applications',
            title: 'Applications',
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
                            id: 'alumno',
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
                            id: 'Registro',
                            title: 'Registro de asistencia',
                            type: 'item',
                            url: '/Academia/Registro'
                        },
                        {
                            id: 'Asistencia',
                            title: 'Consulta de asistencia',
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
                        }

                    ],
                    badge: {
                        title: '1',
                        bg: '#525e8a',
                        fg: '#FFFFFF'
                    }

                }
            ]
        }
    ];
