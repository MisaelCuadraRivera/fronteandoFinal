import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Alert } from 'react-bootstrap';

const ForgetPassword = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		// Aquí envías la solicitud al backend
		try {
			const response = await fetch('http://localhost:3001/forgot-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			const data = await response.json();

			if (!response.ok) {
				setError(
					data.message || 'Algo salió mal, por favor intenta nuevamente.'
				);
			} else {
				setSuccess(
					'Por favor revisa tu correo electrónico para el enlace de recuperación.'
				);
				// Opcional: redirigir al usuario después del éxito
				// navigate('/authentication/sign-in');
			}
		} catch (error) {
			console.error(
				'Hubo un problema con tu solicitud de recuperación de contraseña:',
				error
			);
			setSuccess(
				'Por favor revisa tu correo electrónico para el enlace de recuperación.'
			);
		}
	};

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
							{error && <Alert variant="danger">{error}</Alert>}
							{success && <Alert variant="success">{success}</Alert>}
							<Form onSubmit={handleSubmit}>
								<Row>
									<Col lg={12} md={12} className="mb-3">
										<Form.Label>Correo Electrónico</Form.Label>
										<Form.Control
											type="email"
											id="email"
											placeholder="ejemplo@gmail.com"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3 d-grid gap-2">
										<Button
											style={{
												backgroundColor: '#042b61',
												borderColor: 'white'
											}}
											type="submit"
										>
											Enviar link de recuperación
										</Button>
									</Col>
								</Row>
								<span>
									Regresar a{' '}
									<Link
										to="/authentication/sign-in"
										style={{ color: '#009475' }}
									>
										Iniciar Sesión
									</Link>
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
