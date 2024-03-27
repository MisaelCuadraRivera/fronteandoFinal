// import node module libraries
import React, { Fragment, useState } from 'react';
import {
	Col,
	Row,
	Container,
	Nav,
	Card,
	Tab,
	ListGroup,
	Image
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import popup youtube video

// import custom components
import Ratings from 'components/marketing/common/ratings/Ratings';
import GKTippy from 'components/elements/tooltips/GKTippy';

// import sub components
import CourseCard from '../CourseCard';

// import sub components tabs
import ReviewsTab from './ReviewsTab';
import DescriptionTab from './DescriptionTab';
import FAQTab from './FAQTab';

// import media files
import CheckedMark from 'assets/images/svg/checked-mark.svg';
import CourseJavascript from 'assets/images/course/course-javascript.jpg';
import Avatar1 from 'assets/images/avatar/avatar-1.jpg';

// import data files
import { AllCoursesData } from 'data/slider/AllCoursesData';

const CourseSingle = () => {
	const [isOpen, setOpen] = useState(false);
	const [YouTubeURL] = useState('JRzWRZahOVU');

	return (
		<Fragment>
			{/* Page header */}
			<section className="pt-lg-8 pb-lg-16 pt-8 pb-12" style={{backgroundColor:"#009475"}}>
				<Container>
					<Row className="align-items-center">
						<Col xl={7} lg={7} md={12} sm={12}>
							<div>
								<h1 className="text-white display-4 fw-semi-bold">
									Aprendiendo JavaScript
								</h1>
								<p className="text-white mb-6 lead">
									JavaScript es el lenguaje de programación popular que impulsa páginas web
									y aplicaciones web. Este curso te iniciará en la codificación en JavaScript.
								</p>
								<div className="d-flex align-items-center">
									<GKTippy content="Add to Bookmarks">
										<Link
											to="#"
											className="bookmark text-white text-decoration-none"
										>
											<i className="fe fe-bookmark text-white-50 me-2"></i>
											Guardar
										</Link>
									</GKTippy>
									<span className="text-white ms-3">
										<i className="fe fe-user text-white-50"></i> 14 inscritos{' '}
									</span>
									<span className="ms-4">
										<span className="text-warning">
											<Ratings rating={3.5} />
											<span className="text-white ms-1">(140)</span>
										</span>
									</span>
									<span className="text-white ms-4 d-none d-md-block">
										<svg
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect
												x="3"
												y="8"
												width="2"
												height="6"
												rx="1"
												fill="#DBD8E9"
											></rect>
											<rect
												x="7"
												y="5"
												width="2"
												height="9"
												rx="1"
												fill="#DBD8E9"
											></rect>
											<rect
												x="11"
												y="2"
												width="2"
												height="12"
												rx="1"
												fill="#DBD8E9"
											></rect>
										</svg>{' '}
										<span className="align-middle">Intermedio</span>
									</span>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			{/* Page content */}
			<section className="pb-10">
				<Container>
					<Row>
						<Col lg={8} md={12} sm={12} className="mt-n8 mb-4 mb-lg-0">
							<Tab.Container defaultActiveKey="descripción">
								<Card>
									<Nav className="nav-lb-tab">
										{[
											'Descripción',
											'Reseñas',
										].map((item, index) => (
											<Nav.Item key={index}>
												<Nav.Link
													href={`#${item.toLowerCase()}`}
													eventKey={item.toLowerCase()}
													className="mb-sm-3 mb-md-0"
												>
													{item}
												</Nav.Link>
											</Nav.Item>
										))}
									</Nav>
									<Card.Body className="p-0">
										<Tab.Content>
											<Tab.Pane eventKey="descripción" className="pb-4 p-4">
												{/* Description */}
												<DescriptionTab />
											</Tab.Pane>
											<Tab.Pane eventKey="reseñas" className="pb-4 p-4">
												{/* Reviews */}
												<ReviewsTab />
											</Tab.Pane>
											
										</Tab.Content>
									</Card.Body>
								</Card>
							</Tab.Container>
						</Col>
						<Col lg={4} md={12} sm={12} className="mt-lg-n22">
							{/* Card */}
							<Card className="mb-3 mb-4">
								<div className="p-1">
									<div
										className="d-flex justify-content-center position-relative rounded py-10 border-white border rounded-3 bg-cover"
										style={{
											background: `url(${CourseJavascript})`,
											backgroundRepeat: 'no-repeat',
											backgroundSize: 'cover',
											backgroundPosition: 'top center'
										}}
									>

									</div>
								</div>


								{/* Card body */}
								<Card.Body>
									{/* Price single page */}
									<div className="mb-3">
										<span className="text-dark fw-bold h2 me-2">$600</span>
										<del className="fs-4 text-muted">$750</del>
									</div>
									<div className="d-grid">
										<Link to="#" className="btn mb-2" style={{ backgroundColor: "#042b61", color: "white" }}>
											Inscribirme
										</Link>

									</div>
								</Card.Body>
							</Card>
							{/* Card */}
							<Card className="mb-4">
								{/* Card header */}
								<Card.Header>
									<h4 className="mb-0">What’s included</h4>
								</Card.Header>
								{/* Card Body */}
								<Card.Body className="p-0">
									<ListGroup variant="flush">
										<ListGroup.Item>
											<i className="fe fe-play-circle align-middle me-2 text-primary"></i>
											12 horas de video
										</ListGroup.Item>
										<ListGroup.Item>
											<i className="fe fe-award me-2 align-middle text-success"></i>
											Certificado de finalización
										</ListGroup.Item>
										<ListGroup.Item>
											<i className="fe fe-video align-middle me-2 text-secondary"></i>
											Ver offline
										</ListGroup.Item>
										<ListGroup.Item className="bg-transparent">
											<i className="fe fe-clock align-middle me-2 text-warning"></i>
											Acceso de por vida
										</ListGroup.Item>
									</ListGroup>
								</Card.Body>
							</Card>
							{/* Card */}
							<Card>
								{/* Card body */}
								<Card.Body>
									<div className="d-flex align-items-center">
										<div className="position-relative">
											<Image
												src={Avatar1}
												alt=""
												className="rounded-circle avatar-xl"
											/>
											<Link
												to="#"
												className="position-absolute mt-2 ms-n3"
												data-bs-toggle="tooltip"
												data-placement="top"
												title="Verifed"
											>
												<Image
													src={CheckedMark}
													alt=""
													height="30"
													width="30"
												/>
											</Link>
										</div>
										<div className="ms-4">
											<h4 className="mb-0">Jenny Wilson</h4>
											<p className="mb-1 fs-6">Front-end Developer, Designer</p>
											<span className="fs-6">
												<span className="text-warning">4.5</span>
												<span className="mdi mdi-star text-warning me-2"></span>
												Calificación del instructor
											</span>
										</div>
									</div>
									<Row className="border-top mt-3 border-bottom mb-3 g-0">
										<Col>
											<div className="pe-1 ps-2 py-3">
												<h5 className="mb-0">11,604</h5>
												<span>Estudiantes</span>
											</div>
										</Col>
										<Col className="border-start">
											<div className="pe-1 ps-3 py-3">
												<h5 className="mb-0">32</h5>
												<span>Cursos</span>
											</div>
										</Col>
										<Col className="border-start">
											<div className="pe-1 ps-3 py-3">
												<h5 className="mb-0">12,230</h5>
												<span>Reseñas</span>
											</div>
										</Col>
									</Row>
									<p>
										Descripción del profesor
									</p>
									<Link
										to="/marketing/instructor/instructor-edit-profile/"
										className="btn btn-outline-secondary btn-sm"
									>
										Ver detalles
									</Link>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					{/* Card */}
					<div className="pt-12 pb-3">
						<Row className="d-md-flex align-items-center mb-4">
							<Col lg={12} md={12} sm={12}>
								<h2 className="mb-0">Related Courses</h2>
							</Col>
						</Row>
						<Row>
							{AllCoursesData.filter(function (datasource) {
								return datasource.category === 'javascript';
							})
								.slice(0, 4)
								.map((item, index) => (
									<Col lg={3} md={6} sm={12} key={index}>
										<CourseCard item={item} free />
									</Col>
								))}
						</Row>
					</div>
				</Container>
			</section>
		</Fragment>
	);
};

export default CourseSingle;
