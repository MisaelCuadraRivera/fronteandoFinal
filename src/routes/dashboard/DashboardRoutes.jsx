import { v4 as uuid } from 'uuid';

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		children: [
			{ id: uuid(), link: '/dashboard/overview', name: 'Panel del administrador' },
		]
	},

	{
		id: uuid(),
		title: 'Cursos',
		icon: 'book',
		children: [
			{ id: uuid(), link: '/courses/all-courses', name: 'Todos los cursos' },
			{
				id: uuid(),
				link: '/courses/courses-category',
				name: 'Salones'
			},
		]
	},
	{
		id: uuid(),
		title: 'Usuarios',
		icon: 'user',
		children: [
			{ id: uuid(), link: '/user/instructor', name: 'Instructores' },
			{ id: uuid(), link: '/user/students', name: 'Estudiantes' }
		]
	},
	{
		id: uuid(),
		title: 'Áreas de conocimiento',
		icon: 'layers',
		children: [
			{ id: uuid(), link: '/user/areasKnowledge', name: 'Áreas de conocimiento' },
			
		]
	},

];

export default DashboardMenu;
