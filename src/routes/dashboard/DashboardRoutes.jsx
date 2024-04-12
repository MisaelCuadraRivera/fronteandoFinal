/* eslint-disable */
import { v4 as uuid } from 'uuid';
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 * 				: Object - Icon as an object added from v1.4.0.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */


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
				name: 'Categoria de cursos'
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
];

export default DashboardMenu;
