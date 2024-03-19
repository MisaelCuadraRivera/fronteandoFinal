// import node module libraries
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';

// import media files


const ForgetPassword = () => {
	return (
		<Fragment>
			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={5} md={5} className="py-8 py-xl-0">
					<Card>
						<Card.Body className="p-6">
							<div className="mb-4">
								<h1 className="mb-1 fw-bold">Olvidé mi contraseña</h1>
								<span>Rellena el formulario para recuperar tu contraseña.</span>
							</div>
							{/* Form */}
							<Form>
								<Row>
									<Col lg={12} md={12} className="mb-3">
										{/*  email */}
										<Form.Label>Correo Electrónico</Form.Label>
										<Form.Control
											type="email"
											id="email"
											placeholder="ejemplo@gmail.com"
											required
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3 d-grid gap-2">
										{/* Button */}
										<Button style={{backgroundColor:"#042b61", borderColor:"white"}} type="submit">
											Enviar link de recuperación
										</Button>
									</Col>
								</Row>
								<span>
									Regresar a <Link to="/authentication/sign-in" style={{color:"#009475"}}>Iniciar Sesión</Link>
								</span>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default ForgetPassword;
