export const DashboardMenu = [
	{
		id: 1,
		title: 'Mis cursos',
		link: '/marketing/student/student-subscriptions/',
		icon: 'home'
	},
	
	{
		id: 4,
		title: 'Pagos',
		link: '/marketing/student/student-invoice/',
		icon: 'pie-chart'
	},
	
];

export const AccountSettingsMenu = [
	{
		id: 1,
		title: 'Editar perfil',
		link: '/marketing/student/student-edit-profile/',
		icon: 'settings'
	},
	{
		id: 2,
		title: 'Seguridad',
		link: '/marketing/student/student-security/',
		icon: 'user'
	},
	{
		id: 6,
		title: 'Cerrar sesión',
		link: '/',
		icon: 'power'
	}
];

export const InstructorDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default InstructorDashboardMenu;
