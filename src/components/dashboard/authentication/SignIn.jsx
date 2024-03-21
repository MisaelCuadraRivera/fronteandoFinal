import { Fragment, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';
import Logo from 'assets/images/brand/logo/Logo-utez-2.png';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email === 'keilalizalde@uaem.edu.mx' && password === 'utez123') {
			setIsAuthenticated(true);
		} else {
			alert('Correo electrónico o contraseña incorrectos');
		}
	};

	return (
		<Fragment>
			{isAuthenticated ? (
				<Navigate replace to="/dashboard/overview" />
			) : (
				<Row className="align-items-center justify-content-center g-0 min-vh-100">
					<Col lg={5} md={5} className="py-8 py-xl-0">
						<Card>
							<Card.Body className="p-6">
								<div className="mb-4">
									<Link to="/marketing/landings/landing-courses/">
										<div className='text-center'>
											<Image src={Logo} className="mb-4 w-50" alt="Logo" />
										</div>
									</Link>
									<h1 className="mb-1 fw-bold">Iniciar Sesión</h1>
									<span>
										¿No tienes una cuenta?{' '}
										<Link to="/authentication/sign-up" className="ms-1" style={{ color: "#009475" }}>
											Regístrate
										</Link>
									</span>
								</div>
								<Form onSubmit={handleSubmit}>
									<Row>
										<Col lg={12} md={12} className="mb-3">
											<Form.Label>Correo Electrónico</Form.Label>
											<Form.Control
												type="email"
												id="email"
												placeholder="Correo electrónico"
												required
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</Col>
										<Col lg={12} md={12} className="mb-3">
											<Form.Label>Contraseña</Form.Label>
											<Form.Control
												type="password"
												id="password"
												placeholder="**************"
												required
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</Col>
										<Col lg={12} md={12} className="mb-3">
											<div className="d-md-flex justify-content-between align-items-center">
												<Form.Group controlId="formBasicCheckbox" className="mb-3 mb-md-0">
													<Form.Check type="checkbox" label="Recordarme" />
												</Form.Group>
												<Link to="/authentication/forget-password" style={{ color: "#009475" }}>
													¿Olvidaste tu contraseña?
												</Link>
											</div>
										</Col>
										<Col lg={12} md={12} className="mb-0 d-grid gap-2">
											<Button type="submit" style={{ backgroundColor: "#042b61", borderColor: "white" }}>
												Iniciar Sesión
											</Button>
										</Col>
									</Row>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</Fragment>
	);
};

export default SignIn;
