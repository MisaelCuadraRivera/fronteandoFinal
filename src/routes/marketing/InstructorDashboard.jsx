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
		title: 'Mi Perfil',
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
		link: '/',
		icon: 'power'
	}
];

export const InstructorDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default InstructorDashboardMenu;
