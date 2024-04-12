// import node module libraries
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

// import MDI icons
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';

const HeroTyped = () => {
	return (
		<section className="py-lg-18 py-10 bg-auto bg-light hero-graphics">
			<Container>
				<Row className="justify-content-center">
					<Col xl={7} lg={7} md={12}>
						<div className="py-8 py-lg-0 text-center">
							<h1 className="display-2 fw-bold mb-3 text-primary">
								<span className="text-dark px-3 px-md-0">Mejora en</span>
								<span className="ms-2" style={{color: "#009475"}}>
									<Typewriter
										words={['React', 'Canto', 'JS', 'Spring', 'Java', 'Vue', 'Angular','Contaduria']}
										loop
										cursor
										cursorStyle="|"
										typeSpeed={60}
										deleteSpeed={50}
										delaySpeed={1000}
									/>
								</span>
							</h1>
							<p className="mb-6 h2 text-dark">
							     Desarrolla tus habilidades con los mejores cursos presenciales que te ofrece la UTEZ
							</p>
							<Link
								to="/marketing/course-category/"
								className="btn btn-success me-2"
								
							>
								Ver cursos
							</Link>
							<Link
								to="/authentication/sign-up"
								className="btn btn-outline-primary"
							>
								Regístrate 
							</Link>

							<div className="mt-8 mb-0">
								<ListGroup as="ul" bsPrefix="list-inline">
									<ListGroup.Item
										as="li"
										bsPrefix="list-inline-item text-dark fw-semi-bold lh-1 fs-4 me-3 mb-2 mb-md-0"
									>
										<span className="icon-shape icon-xs rounded-circle bg-light-success text-center me-2">
											<Icon
												path={mdiCheck}
												size={0.7}
												className="text-success"
											/>
										</span>
										<span className="align-middle">+100 cursos </span>
									</ListGroup.Item>
									<ListGroup.Item
										as="li"
										bsPrefix="list-inline-item text-dark fw-semi-bold lh-1 fs-4 me-3 mb-2 mb-md-0"
									>
										<span className="icon-shape icon-xs rounded-circle bg-light-success text-center me-2">
											<Icon
												path={mdiCheck}
												size={0.7}
												className="text-success"
											/>
										</span>
										<span className="align-middle">Instructores expertos</span>
									</ListGroup.Item>
									<ListGroup.Item
										as="li"
										bsPrefix="list-inline-item text-dark fw-semi-bold lh-1 fs-4"
									>
										<span className="icon-shape icon-xs rounded-circle bg-light-success text-center me-2">
											<Icon
												path={mdiCheck}
												size={0.7}
												className="text-success"
											/>
										</span>
										<span className="align-middle">Acceso de por vida</span>
									</ListGroup.Item>
								</ListGroup>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};
export default HeroTyped;
