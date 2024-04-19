const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token de autenticación
    window.location.href = '/'; // Redirige al usuario a la página de inicio de sesión
};

export const DashboardMenu = [
    {
        id: 1,
        title: 'Dashboard',
        link: '/marketing/instructor/dashboard/',
        icon: 'home'
    },
    {
        id: 2,
        title: 'Mis Cursos',
        link: '/marketing/instructor/instructor-my-courses/',
        icon: 'book'
    },
    {
        id: 6,
        title: 'Estudiantes',
        link: '/marketing/instructor/instructor-students/',
        icon: 'users'
    },
];

export const AccountSettingsMenu = [
    {
        id: 1,
        title: 'Editar Perfil',
        link: '/marketing/instructor/instructor-edit-profile/',
        icon: 'settings'
    },
    {
        id: 2,
        title: 'Seguridad',
        link: '/marketing/instructor/instructor-security/',
        icon: 'user'
    },
    {
        id: 6,
        title: 'Cerrar Sesión',
        action: handleLogout,  // Agregar un manejo de acción para cerrar sesión
        icon: 'power'
    }
];

export const InstructorDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default InstructorDashboardMenu;
