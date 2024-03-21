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
		id: 3,
		title: 'Reseñas',
		link: '/marketing/instructor/instructor-reviews/',
		icon: 'star'
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
		id: 3,
		title: 'Redes Sociales',
		link: '/marketing/instructor/instructor-social-profiles/',
		icon: 'refresh-cw'
	},
	{
		id: 6,
		title: 'Eliminar Perfil',
		link: '/marketing/instructor/instructor-delete-profile/',
		icon: 'trash'
	},
	{
		id: 6,
		title: 'Cerrar Sesión',
		link: '/',
		icon: 'power'
	}
];

export const InstructorDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default InstructorDashboardMenu;
