import { v4 as uuid } from 'uuid';

// import media files
import GatsbyCourse from 'assets/images/course/course-gatsby.jpg';
import JavaScriptCourse from 'assets/images/course/course-javascript.jpg';
import GraphQLCourse from 'assets/images/course/course-graphql.jpg';
import HTMLCourse from 'assets/images/course/course-html.jpg';

export const BestSellingCoursesData = [
	{
		id: uuid(),
		image: GatsbyCourse,
		title: 'Curso de Sexting',
		sales: 34,
		amount: 3145.23
	},
	{
		id: uuid(),
		image: GraphQLCourse,
		title: 'Curso de Carding',
		sales: 30,
		amount: 2611.82
	},
	{
		id: uuid(),
		image: HTMLCourse,
		title: 'Grindr Users Course',
		sales: 26,
		amount: 2372.19
	},
];

export default BestSellingCoursesData;
