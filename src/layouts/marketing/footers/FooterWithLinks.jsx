// import node module libraries
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Container, ListGroup } from 'react-bootstrap';

// import MDI icons
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter, mdiInstagram } from '@mdi/js';

// import media files
import FooterLogo from 'assets/images/brand/logo/Logo-utez-2.png';
import AppStore from 'assets/images/svg/appstore.svg';
import PlayStore from 'assets/images/svg/playstore.svg';

const FooterWithLinks = () => {
	return (
		<Fragment>
			<footer className="pt-lg-10 pt-5 footer bg-white">
				<Container>
					<Row>
						<Col lg={4} md={6} sm={12}>
							{/* about company  */}
							<div className="mb-4">
								<Image src={FooterLogo} alt="" className="logo-inverse w-50" />
								<div className="mt-4">

									{/* social media */}
									<div className="fs-4 mt-4">
										<Link to="#" className="mdi mdi-facebook text-muted me-2">
											<Icon path={mdiFacebook} size={0.7} />
										</Link>
										<Link to="#" className="mdi mdi-twitter text-muted me-2">
											<Icon path={mdiTwitter} size={0.7} />
										</Link>
										<Link to="#" className="mdi mdi-instagram text-muted ">
											<Icon path={mdiInstagram} size={0.7} />
										</Link>
									</div>
								</div>
							</div>
						</Col>
						<Col lg={{ span: 2, offset: 1 }} md={3} sm={6}>
							<div className="mb-4">
								{/* list */}
								<h3 className="fw-bold mb-3">Compañía</h3>
								<ListGroup
									as="ul"
									bsPrefix="list-unstyled"
									className="nav nav-footer flex-column nav-x-0"
								>
									<ListGroup.Item as="li" bsPrefix=" ">
										<Link to="#" className="nav-link">
											Sobre nosotros
										</Link>
									</ListGroup.Item>

									<ListGroup.Item as="li" bsPrefix=" ">
										<Link to="#" className="nav-link">
											Contáctanos
										</Link>
									</ListGroup.Item>
								</ListGroup>
							</div>
						</Col>
						<Col lg={2} md={3} sm={6}>
							<div className="mb-4">
								{/* list  */}
								<h3 className="fw-bold mb-3">Ayuda</h3>
								<ListGroup
									as="ul"
									bsPrefix="list-unstyled"
									className="nav nav-footer flex-column nav-x-0"
								>
									<ListGroup.Item as="li" bsPrefix=" ">
										<Link to="/marketing/help-center/support/" className="nav-link">
											Soporte
										</Link>
									</ListGroup.Item>
								</ListGroup>
							</div>
						</Col>
						<Col lg={3} md={12} sm={12}>
							{/* contact info */}
							<div className="mb-4">
								<h3 className="fw-bold mb-3">Visítanos</h3>
								<p>Av. Universidad Tecnológica 1, Palo Escrito, 62765 Emiliano Zapata, Mor.</p>

								<p>
									Teléfono:{' '}
									<span className="text-dark fw-semi-bold">
										01 800 050 UTEZ(8839)
									</span>
								</p>
							</div>
						</Col>
					</Row>
				</Container>
			</footer>
		</Fragment>
	);
};

export default FooterWithLinks;
