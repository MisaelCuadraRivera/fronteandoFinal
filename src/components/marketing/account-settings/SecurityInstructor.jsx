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

const SecurityInstructor = () => {
	const location = useLocation();

	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');
	const [currentpassword, setCurrentPassword] = useState('');

	return (
		<ProfileLayoutWrap pathpara={location.pathname}>
			<Card className="border-0">
				<Card.Header>
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Seguridad Instructor</h3>
						<p className="mb-0">
							Edita tu configuración de la cuenta y cambia la contraseña.
						</p>
					</div>
				</Card.Header>
				<Card.Body>
					<h4 className="mb-0">Correo Electrónico</h4>
					<p>
						Tu correo actual es{' '}
						<span className="text-success">{'correo'}</span>
					</p>
					<Form>
						<Row>
							<Col lg={6} md={12} sm={12} className="mb-3">
								<Form.Group>
									<Form.Label htmlFor="email">Nuevo correo electronico</Form.Label>
									<Form.Control type="email" id="email" required />
								</Form.Group>
								<Button type="submit" className="btn btn-sm mt-2" style={{backgroundColor: "#042b61", borderColor: "white"}}>
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
						<Form>
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
								<Col lg={12} md={12} sm={12} className="mt-4">
									<p className="mb-0">
										¿No recuerdas tu contraseña?{' '}
										<Link to="" style={{color: "#009475"}}>Restablece tu contraseña</Link>
									</p>
								</Col>
							</Row>
						</Form>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayoutWrap>
	);
};

export default SecurityInstructor;
