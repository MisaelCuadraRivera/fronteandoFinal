import Swal from 'sweetalert2';

const handleLogout = () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Se cerrará tu sesión actual.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Cerrar Sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear(); // Elimina todos los elementos del localStorage
            window.location.href = '/'; // Redirige al usuario al inicio de sesión u otra página
        }
    });
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
        action: handleLogout,  // Ahora incluye la alerta de confirmación
        icon: 'power'
    }
];

export const InstructorDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default InstructorDashboardMenu;
