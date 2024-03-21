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

// import courses media files
import LaravelCourse from 'assets/images/course/course-laravel.jpg';
import GatsbyCourse from 'assets/images/course/course-gatsby.jpg';
import JavaScriptCourse from 'assets/images/course/course-javascript.jpg';
import NodeCourse from 'assets/images/course/course-node.jpg';
import ReactCourse from 'assets/images/course/course-react.jpg';
import AngularCourse from 'assets/images/course/course-angular.jpg';
import GraphQLCourse from 'assets/images/course/course-graphql.jpg';
import HTMLCourse from 'assets/images/course/course-html.jpg';

export const MyCoursesData = [
	{
		id: 1,
		category: 'Courses',
		image: GraphQLCourse,
		title: 'Curso de Carding',
		duration: '1h 30m',
		date: '7 July, 2021 1:42pm',
		instructor_name: 'Reva Yokk',
		instructor_image: Avatar7,
		status: 'Draft',
		level: 'Beginner',
		students: 12234,
		rating: 4.5,
		votes: 3250,
		progress: 25
	},
	{
		id: 2,
		category: 'Marketing',
		image: GatsbyCourse,
		duration: '3h 40m',
		title: 'Curso de Sexting',
		date: '6 July, 2021 2:42pm',
		instructor_name: 'Brooklyn Simmons',
		instructor_image: Avatar6,
		status: 'Draft',
		level: 'Intermediate',
		students: 2000,
		rating: 4.5,
		votes: 5300
	},
	{
		id: 3,
		category: 'Workshop',
		image: HTMLCourse,
		duration: '4h 10m',
		title: 'Grinders Users Course',
		instructor_image: Avatar5,
		status: 'Pending',
		level: 'Beginner',
		students: 22345,
		rating: 4.5,
		votes: 6380,
		progress: 25
	},
	
];

export default MyCoursesData;
