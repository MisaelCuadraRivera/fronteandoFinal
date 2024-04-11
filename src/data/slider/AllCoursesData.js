// import media files

// import avatar media files
import Avatar1 from 'assets/images/avatar/avatar-1.jpg';
import Avatar2 from 'assets/images/avatar/avatar-2.jpg';
import Avatar3 from 'assets/images/avatar/avatar-3.jpg';
import Avatar4 from 'assets/images/avatar/avatar-4.jpg';
import Avatar5 from 'assets/images/avatar/avatar-5.jpg';
import Avatar6 from 'assets/images/avatar/avatar-6.jpg';
import Avatar7 from 'assets/images/avatar/avatar-7.jpg';
import Avatar9 from 'assets/images/avatar/avatar-9.jpg';
import Avatar8 from 'assets/images/avatar/avatar-8.jpg';
import Avatar10 from 'assets/images/avatar/avatar-10.jpg';

// import courses media files
import LaravelCourse from 'assets/images/course/course-laravel.jpg';
import GatsbyCourse from 'assets/images/course/course-gatsby.jpg';
import JavaScriptCourse from 'assets/images/course/course-javascript.jpg';
import NodeCourse from 'assets/images/course/course-node.jpg';
import ReactCourse from 'assets/images/course/course-react.jpg';
import AngularCourse from 'assets/images/course/course-angular.jpg';
import GraphQLCourse from 'assets/images/course/course-graphql.jpg';
import HTMLCourse from 'assets/images/course/course-html.jpg';
import PythonCourse from 'assets/images/course/course-python.jpg';
import CSSCourse from 'assets/images/course/course-css.jpg';
import WordPressCourse from 'assets/images/course/course-wordpress.jpg';

export const AllCoursesData = [
	{
		id: 1,
		category: 'gatsby',
		image: GatsbyCourse,
		title: 'Carding, ¿Bendición de los pobres, o maldición de los ricos?',
		date_added: 'Agregado 7/Junio/2023',
		instructor_name: 'Misael Cuadra',
		instructor_image: Avatar7,
		status: 'Pending',
		level: 'Intermedio',
		duration: '1h 46m',
		price: 850,
		discount: 50,
		rating: 2.0,
		ratingby: 16500,
		recommended: false,
		popular: false,
		trending: true,
		progress: 45
	},
	{
		id: 2,
		category: 'graphql',
		image: GraphQLCourse,
		title: '¿Fue justa la final de la copa mundial 2022?',
		date_added: 'Agregado 06/Enero/2023',
		instructor_name: 'Misael Cuadra',
		instructor_image: Avatar6,
		status: 'Pending',
		level: 'Avanzado',
		duration: '2h 40m',
		price: 600,
		discount: 100,
		rating: 2.5,
		ratingby: 1500,
		recommended: true,
		popular: false,
		trending: false,
		progress: 95
	},
	{
		id: 3,
		category: 'html',
		image: HTMLCourse,
		title: '¿Deberia exitir DACEA veradaderamente?',
		date_added: 'Agregado 05/Febrero/2023',
		instructor_name: 'Misael Cuadra',
		instructor_image: Avatar5,
		status: 'Pending',
		level: 'Principiante',
		duration: '3h 16m',
		price: 700,
		discount: 150,
		rating: 3.0,
		ratingby: 1600,
		recommended: false,
		popular: true,
		trending: true,
		progress: 55
	},
];

export default AllCoursesData;
