// import node module libraries
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';

// import media files
import Logo from 'assets/images/brand/logo/Logo-utez.png';

const SignIn = () => {
	return (
		<Fragment>
			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={5} md={5} className="py-8 py-xl-0">
					<Card>
						<Card.Body className="p-6">
							<div className="mb-4">
								<Link to="/marketing/landings/landing-courses/">
									<Image src={Logo} className="mb-4" alt="" />
								</Link>
								<h1 className="mb-1 fw-bold">Iniciar Sesión</h1>
								<span>
									¿No tienes una cuenta?{' '}
									<Link to="/authentication/sign-up" className="ms-1">
										Regístrate
									</Link>
								</span>
							</div>
							{/* Form */}
							<Form>
								<Row>
									<Col lg={12} md={12} className="mb-3">
										{/* Username or email */}
										<Form.Label>Correo Electrónico </Form.Label>
										<Form.Control
											type="email"
											id="email"
											placeholder="Correo electrónico"
											required
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Password */}
										<Form.Label>Contraseña </Form.Label>
										<Form.Control
											type="password"
											id="password"
											placeholder="**************"
											required
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Checkbox */}
										<div className="d-md-flex justify-content-between align-items-center">
											<Form.Group
												className="mb-3 mb-md-0"
												controlId="formBasicCheckbox"
											>
												<Form.Check type="checkbox" label="Recordarme" />
											</Form.Group>
											<Link to="/authentication/forget-password">
												¿Olvidaste tu contraseña?
											</Link>
										</div>
									</Col>
									<Col lg={12} md={12} className="mb-0 d-grid gap-2">
										{/* Button */}
										<Button variant="primary" type="submit">
											Iniciar Sesión
										</Button>
									</Col>
								</Row>
							</Form>
							
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default SignIn;
