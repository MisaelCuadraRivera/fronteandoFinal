// import node module libraries
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Nav, Tab, Container } from 'react-bootstrap';

// import custom components
import PageHeadingBriefinfo from 'components/marketing/common/page-headings/PageHeadingBriefinfo';

// import sub components
import PopularInstructorCard from './PopularInstructorCard';
import CourseCard from '../CourseCard';

// import data files
import { AllCoursesData } from 'data/slider/AllCoursesData';
import { InstructorData } from 'data/users/InstructorData';

const CourseCategory = () => {
	const [courses, setCourses] = useState([]); // Estado para almacenar los cursos

    // Cargar los cursos desde la API
	useEffect(() => {
		axios.get('http://localhost:3001/api/cursos')
			.then(response => {
				console.log("API Data:", response.data); // Esto te mostrará lo que recibes de la API
				setCourses(response.data);
			})
			.catch(error => {
				console.error("Error fetching courses: ", error);
			});
	}, []);
	
	return (
		<Fragment>
			{/* Page header */}
			<PageHeadingBriefinfo
				pagetitle="Todos los cursos"
				briefinfo="Territorio de calidad."
			/>

			<section className="py-6">
				<Container>

					{/* Popular Instructors start */}
					<Row>
						<Col lg={12} md={12} sm={12}>
							<div className="mb-5">
								<h2 className="mb-1">Instructores populares</h2>
								<p className="mb-0">
									Instructores populares de la UTEZ.
								</p>
							</div>
						</Col>
									</Row>
									<Row className="mb-6">
				<Col lg={12}  > <PopularInstructorCard />
				</Col>
				</Row>
					{/* end of Popular Instructors */}



					{/* all javaScript courses start */}
					<Row>
						<Col lg={12} md={12} sm={12}>
							<div className="mb-5">
								<h2 className="mb-1">Todos Los Cursos </h2>
								<p className="mb-0">
								Los mejores cursos para nuestros estudiantes
								</p>
							</div>
						</Col>
					</Row>
					<Row className="mb-6">
					{courses.map((course) => (
                                <Col lg={3} md={6} sm={12} key={course.id}>
                                  <CourseCard course={course} />
                                </Col>
                              ))}
                    </Row>
					{/* end of all javaScript courses */}
				</Container>
			</section>
		</Fragment>
	);
};

export default CourseCategory;
