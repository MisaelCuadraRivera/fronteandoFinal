import { v4 as uuid } from 'uuid';

const NavbarDefault = [
	{
		id: uuid(),
		menuitem: 'Cursos',
		link: '#',
		children: [
			{
				id: uuid(),
				menuitem: 'Desarrollo web',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Bootstrap',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'React',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'GraphQl',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'Gatsby',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'Grunt',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'Svelte',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'Meteor',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'HTML5',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'Angular',
						link: '/marketing/course-category/'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Diseño',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Diseño gráfico',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'Illustrator',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'UX / UI Design',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'Figma Design',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'Adobe XD',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'Sketch',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'Icon Design',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'Photoshop',
						link: '/marketing/course-category/'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Desarrollo móvil',
				link: '/marketing/course-category/'
			},
			{
				id: uuid(),
				menuitem: 'Contabilidad',
				link: '/marketing/course-category/'
			},
			{
				id: uuid(),
				menuitem: 'Marketing',
				link: '/marketing/course-category/'
			},
			{
				id: uuid(),
				menuitem: 'Música',
				link: '/marketing/course-category/'
			},
			{
				id: uuid(),
				menuitem: 'Fotografía',
				link: '/marketing/course-category/'
			}
		]
	},

	{
		id: uuid(),
		menuitem: 'Secciones',
		link: '#',
		children: [
			{
				id: uuid(),
				menuitem: 'Cursos',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Course Single',
						link: '/marketing/courses/course-single/'
					},
					{
						id: uuid(),
						menuitem: 'Course Single v2',
						link: '/marketing/courses/course-single2/'
					},
					{
						id: uuid(),
						menuitem: 'Course Resume',
						link: '/marketing/courses/course-resume/'
					},
					{
						id: uuid(),
						menuitem: 'Course Category',
						link: '/marketing/course-category/'
					},
					{
						id: uuid(),
						menuitem: 'Course Checkout',
						link: '/marketing/courses/course-checkout/'
					},
					{
						id: uuid(),
						menuitem: 'Course List/Grid',
						link: '/marketing/courses/course-filter-page/'
					},
					{
						id: uuid(),
						menuitem: 'Add New Course',
						link: '/marketing/instructor/add-new-course/'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Categorías',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Categorías',
						link: '/marketing/courses/course-path/'
					},
					{
						id: uuid(),
						menuitem: 'Por nivel',
						link: '/marketing/courses/course-path-single/'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Especiales',
				link: '#',
				children: [
			
					{
						id: uuid(),
						menuitem: 'Error 404',
						link: '/marketing/specialty/404-error/'
					},
					{
						id: uuid(),
						menuitem: 'Modo mantenimiento',
						link: '/marketing/specialty/maintenance-mode/'
					},
					{
						id: uuid(),
						menuitem: 'Términos y condiciones',
						link: '/marketing/specialty/terms-and-conditions/'
					}
				]
			},
			{
				id: uuid(),
				divider: true
			},
			{
				id: uuid(),
				menuitem: 'About',
				link: '/marketing/pages/about/'
			},
			{
				id: uuid(),
				menuitem: 'Help Center',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Help Center',
						link: '/marketing/help-center/'
					},
					{
						id: uuid(),
						menuitem: "FAQ's",
						link: '/marketing/help-center/faq/'
					},
					{
						id: uuid(),
						menuitem: 'Guide',
						link: '/marketing/help-center/guide/'
					},
					{
						id: uuid(),
						menuitem: 'Guide Single',
						link: '/marketing/help-center/guide-single/getting-started/what-is-this-geeks-app'
					},
					{
						id: uuid(),
						menuitem: 'Support',
						link: '/marketing/help-center/support/'
					}
				]
			},

		
		]
	},
	{
		id: uuid(),
		menuitem: 'Cuentas',
		link: '#',
		children: [
			{
				id: uuid(),
				header: true,
				header_text: 'Cuentas'
			},
			{
				id: uuid(),
				menuitem: 'Instructor',
				link: '#',
				children: [
					{
						id: uuid(),
						header: true,
						header_text: 'Instructor',
						description: 'Instructor dashboard.'
					},
					{
						id: uuid(),
						divider: true
					},
					{
						id: uuid(),
						menuitem: 'Dashboard',
						link: '/marketing/instructor/dashboard/'
					},
					{
						id: uuid(),
						menuitem: 'Perfil',
						link: '/marketing/instructor/instructor-profile/'
					},
					{
						id: uuid(),
						menuitem: 'Mis cursos',
						link: '/marketing/instructor/instructor-my-courses/'
					},
					{
						id: uuid(),
						menuitem: 'Órdenes',
						link: '/marketing/instructor/instructor-orders/'
					},
					{
						id: uuid(),
						menuitem: 'Reseñas',
						link: '/marketing/instructor/instructor-reviews/'
					},
					{
						id: uuid(),
						menuitem: 'Students',
						link: '/marketing/instructor/instructor-students/'
					},
					{
						id: uuid(),
						menuitem: 'Payouts',
						link: '/marketing/instructor/instructor-payouts/'
					},
					{
						id: uuid(),
						menuitem: 'Ganancias',
						link: '/marketing/instructor/instructor-earnings/'
					},
				]
			},
			{
				id: uuid(),
				menuitem: 'Estudiantes',
				link: '#',
				children: [
					{
						id: uuid(),
						header: true,
						header_text: 'Estudiantes',
						description:
							'Dashboard del estudiante.'
					},
					{
						id: uuid(),
						divider: true
					},
					{
						id: uuid(),
						menuitem: 'Dashboard',
						link: '/marketing/student/dashboard/'
					},
					{
						id: uuid(),
						menuitem: 'Mis cursos',
						link: '/marketing/student/student-subscriptions/'
					},
					{
						id: uuid(),
						menuitem: 'Pagos',
						link: '/marketing/student/student-payment/'
					},
					{
						id: uuid(),
						menuitem: 'Recibos',
						link: '/marketing/student/student-invoice/'
					},
					{
						id: uuid(),
						menuitem: 'Favoritos',
						link: '/marketing/student/dashboard/'
					}
					
				]
			},
			{
				id: uuid(),
				menuitem: 'Admin',
				link: '#',
				children: [
					{
						id: uuid(),
						header: true,
						header_text: 'Súper Admin',
						description:
							''
					},
					{
						id: uuid(),
						divider: true
					},
					{
						id: uuid(),
						menuitem: 'Dashboard',
						link: '/dashboard/overview/',
						type: 'button'
					}
				]
			},
			{
				id: uuid(),
				divider: true
			},
			{
				id: uuid(),
				menuitem: 'Inicio de Sesión',
				link: '/authentication/sign-in/'
			},
			{
				id: uuid(),
				menuitem: 'Registro',
				link: '/authentication/sign-up/'
			},
			{
				id: uuid(),
				menuitem: 'Olvidé mi contraseña',
				link: '/authentication/forget-password/'
			},
			{
				id: uuid(),
				menuitem: 'Editar perfil',
				link: '/marketing/student/student-edit-profile/'
			},
			{
				id: uuid(),
				menuitem: 'Seguridad',
				link: '/marketing/student/student-security/'
			}
		]
	}
];

export default NavbarDefault;
