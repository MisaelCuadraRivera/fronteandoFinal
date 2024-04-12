// import node module libraries
import React, { useState } from 'react';
import {
	Col,
	Row,
	Form,
	Card,
	OverlayTrigger,
	Tooltip,
	Button
} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

// import custom components
import PasswordStrengthMeter from 'components/elements/passwordstrength/PasswordStrengthMeter';

// import profile layout wrapper
import ProfileLayoutWrap from './ProfileLayoutWrap';

const Security = () => {
	
	const location = useLocation();

	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');
	const [currentpassword, setCurrentPassword] = useState('');

	const handleEmailUpdate = async (event) => {
		event.preventDefault();
		const token = localStorage.getItem('token');
		const email = event.target.elements.newEmail.value;
	
		try {
			const response = await fetch('http://localhost:3001/user/updateemail', {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});
	
			if (!response.ok) {
				throw new Error('Error al actualizar el correo electrónico');
				console.log(response);
			}
	
			alert('Correo electrónico actualizado con éxito');
		} catch (error) {
			console.error(error.message);
			alert('Hubo un error al actualizar el correo electrónico');
		}
	};

	const handlePasswordUpdate = async (event) => {
		event.preventDefault();
		const token = localStorage.getItem('token');
		const currentPassword = currentpassword;
		const newPassword = password;
		const confirmPassword = confirmpassword;
	
		if (newPassword !== confirmPassword) {
			alert('Las contraseñas no coinciden');
			return;
		}
	
		try {
			const response = await fetch('http://localhost:3001/user/updatepassword', {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ currentPassword, newPassword }),
			});
	
			if (!response.ok) {
				throw new Error('Error al actualizar la contraseña');
			}
	
			alert('Contraseña actualizada con éxito');
		} catch (error) {
			console.error(error.message);
			alert('Hubo un error al actualizar la contraseña');
		}
	};
	
	

	return (
		<ProfileLayoutWrap pathpara={location.pathname}>
			<Card className="border-0">
				<Card.Header>
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Seguridad</h3>
						<p className="mb-0">
							Edita tu configuración de la cuenta y cambia la contraseña.
						</p>
					</div>
				</Card.Header>
				<Card.Body>
					<h4 className="mb-0">Correo Electrónico</h4>
					<Form id="email" onSubmit={handleEmailUpdate}>
						<Row>
							<Col lg={6} md={12} sm={12} className="mb-3">
								<Form.Group>
									<Form.Label htmlFor="email">Nuevo correo electronico</Form.Label>
									<Form.Control type="email" id="newEmail" required />
								</Form.Group>
								<Button type="submit" className="btn btn-sm" style={{backgroundColor: "#042b61", borderColor: "white"}}>
									Actualizar detalles
								</Button>
							</Col>
						</Row>
					</Form>
					<hr className="my-5" />
					<div>
						<h4 className="mb-0">Cambiar contraseñas</h4>
						<p>
							Vas a recibir un correo con la confirmacion del cambio de contraseña.
						</p>
						{/* Form */}
						<Form id="formPassword" onSubmit={handlePasswordUpdate}>
							<Row>
								<Col lg={6} md={12} sm={12}>
									{/* Current password */}

									<Form.Group className="mb-3">
										<Form.Label htmlFor="currentpassword">
											Contraseña actual
										</Form.Label>
										<Form.Control
											type="password"
											id="currentpassword"
											value={currentpassword}
											onChange={(e) => setCurrentPassword(e.target.value)}
											required
										/>
									</Form.Group>

									{/* New password */}
									<Form.Group className="mb-3">
										<Form.Label htmlFor="newpassword">Nueva Contraseña</Form.Label>
										<Form.Control
											type="password"
											id="newpassword"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</Form.Group>

									<Row className="align-items-center g-0">
										<Col sm={6}>
											<span
												data-bs-toggle="tooltip"
												data-placement="right"
												title=""
											>
												Seguridad de la contraseña
												<OverlayTrigger
													key="top"
													placement="top"
													overlay={
														<Tooltip id="tooltip-top">
															Para su seguridad trate que la contraseña sean mayor a 6 caracteres
														</Tooltip>
													}
												>
													<i className="fas fa-question-circle ms-1"></i>
												</OverlayTrigger>
											</span>
										</Col>
									</Row>
									<PasswordStrengthMeter password={password} />

									{/* Confirm new password */}
									<Form.Group className="mb-3">
										<Form.Label htmlFor="confirmpassword">
											Confirmar nueva contraseña
										</Form.Label>
										<Form.Control
											type="password"
											id="confirmpassword"
											value={confirmpassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
										/>
									</Form.Group>
									{/* Button */}
									<Button type="submit" className="btn btn-sm" style={{backgroundColor: "#042b61", borderColor: "white"}}>
										Guardar contraseña
									</Button>
									<Col xs={6}></Col>
								</Col>
							</Row>
						</Form>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayoutWrap>
	);
};

export default Security;
