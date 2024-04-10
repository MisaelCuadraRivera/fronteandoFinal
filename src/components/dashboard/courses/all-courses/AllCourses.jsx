// import node module libraries
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Tab, Card, Nav, Breadcrumb } from 'react-bootstrap';

// import sub custom components
import CoursesTable from './CoursesTable';

// import data files
import {
	allcourses,
	allapprovedcourses,
	allpendingcourses
} from 'data/courses/AllCoursesData';

const AllCourses = () => {
	return (
		<Fragment>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-1 h2 fw-bold">Todos los cursos</h1>
						</div>
						<div>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<Tab.Container defaultActiveKey="all">
						<Card>
							<Card.Header className="border-bottom-0 p-0 bg-white">
								<Nav className="nav-lb-tab">
									<Nav.Item>
										<Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
											Todos
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</Card.Header>
							<Card.Body className="p-0">
								<Tab.Content>
									<Tab.Pane eventKey="all" className="pb-4">
										<CoursesTable courses_data={allcourses} />
									</Tab.Pane>
									<Tab.Pane eventKey="approved" className="pb-4">
										<CoursesTable courses_data={allapprovedcourses} />
									</Tab.Pane>
									<Tab.Pane eventKey="pending" className="pb-4">
										<CoursesTable courses_data={allpendingcourses} />
									</Tab.Pane>
								</Tab.Content>
							</Card.Body>
						</Card>
					</Tab.Container>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AllCourses;
