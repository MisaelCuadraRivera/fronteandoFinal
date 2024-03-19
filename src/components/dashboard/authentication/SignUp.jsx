import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';

// import media files
import Logo from 'assets/images/brand/logo/Logo-utez-2.png';

const SignUp = () => {
	return (
		<Fragment>
			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={6} md={8} className="py-8 py-xl-0">
					<Card>
						<Card.Body className="p-6">
							<div className="mb-4 ">
								<Link to="/marketing/landings/landing-courses/">
									<div className='text-center'>
										<Image src={Logo} className="mb-4 w-50" alt="" />
									</div>
								</Link>
								<h1 className="mb-1 fw-bold mb-4">Registrarme</h1>
								<span>
									¿Ya tienes una cuenta?{' '}
									<Link to="/authentication/sign-in" className="ms-1" style={{ color: "#009475" }}>
										Iniciar Sesión
									</Link>
								</span>
							</div>
							{/* Form */}
							<Form>
								<Row>
									<Col lg={6} md={12} className="mb-3">
										{/* First Name */}
										<Form.Label>Nombre(s)</Form.Label>
										<Form.Control
											type="text"
											id="first_name"
											placeholder="Nombre(s)"
											required
										/>
									</Col>
									<Col lg={6} md={12} className="mb-3">
										{/* Last Name */}
										<Form.Label>Apellidos</Form.Label>
										<Form.Control
											type="text"
											id="last_name"
											placeholder="Apellidos"
											required
										/>
									</Col>
									<Col lg={6} md={12} className="mb-3">
										{/* Gender */}
										<Form.Label>Sexo</Form.Label>
										<Form.Select id="gender">
											<option>Selecciona tu sexo</option>
											<option value="male">Masculino</option>
											<option value="female">Femenino</option>
											<option value="other">Otro</option>
										</Form.Select>
									</Col>
									<Col lg={6} md={12} className="mb-3">
										{/* Date of Birth */}
										<Form.Label>Fecha de nacimiento</Form.Label>
										<Form.Control
											type="date"
											id="dob"
											required
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Mobile Number */}
										<Form.Label>Número de Celular</Form.Label>
										<Form.Control
											type="tel"
											id="mobile"
											placeholder="Número de Celular"
											required
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Indigenous Language */}
										<Form.Label>¿Hablas alguna lengua indígena?</Form.Label>
										<Form.Check
											type="radio"
											label="Sí"
											name="indigenousLanguage"
											id="yesLanguage"
											className="mb-2"
										/>
										<Form.Check
											type="radio"
											label="No"
											name="indigenousLanguage"
											id="noLanguage"
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Education Level */}
										<Form.Label>Nivel Máximo Cursado</Form.Label>
										<Form.Select id="educationLevel">
											<option>Selecciona tu nivel educativo</option>
											<option value="primary">Educación Primaria</option>
											<option value="secondary">Educación Secundaria</option>
											<option value="high_school">Educación Media Superior</option>
											<option value="technical">Técnico Superior Universitario</option>
											<option value="bachelor">Licenciatura o Ingeniería</option>
										</Form.Select>
									</Col>
									<Col lg={6} md={12} className="mb-3">
										{/* State */}
										<Form.Label>Estado</Form.Label>
										<Form.Control
											type="text"
											id="state"
											placeholder="Estado"
											required
										/>
									</Col>
									<Col lg={6} md={12} className="mb-3">
										{/* Municipality */}
										<Form.Label>Municipio</Form.Label>
										<Form.Control
											type="text"
											id="municipality"
											placeholder="Municipio"
											required
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Discovery */}
										<Form.Label>¿Cómo se enteró del servicio?</Form.Label>
										<Form.Select id="discovery">
											<option>Selecciona una opción</option>
											<option value="facebook">Facebook</option>
											<option value="instagram">Instagram</option>
											<option value="email">Correo Electrónico</option>
											<option value="recommendation">Recomendación</option>
											<option value="other">Otro</option>
										</Form.Select>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Disability */}
										<Form.Label>¿Tiene algún tipo de discapacidad?</Form.Label>
										<Form.Select id="disability">
											<option>Selecciona si tienes alguna discapacidad</option>
											<option value="none">Ninguna</option>
											<option value="sensory">Discapacidad Sensorial</option>
											<option value="physical">Discapacidad Física Motora</option>
										</Form.Select>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* UTEZ Community */}
										<Form.Label>¿Es parte de la comunidad UTEZ?</Form.Label>
										<Form.Select id="utezCommunity">
											<option>Selecciona tu relación con la UTEZ</option>
											<option value="student">Estudiante UTEZ</option>
											<option value="graduate">Egresado UTEZ</option>
											<option value="teacher">Personal docente</option>
											<option value="administrative">Administrativo UTEZ</option>
											<option value="public">Público general</option>
										</Form.Select>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Email */}
										<Form.Label>Correo Electrónico</Form.Label>
										<Form.Control
											type="email"
											id="email"
											placeholder="Correo Electrónico"
											required
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Password */}
										<Form.Label>Contraseña</Form.Label>
										<Form.Control
											type="password"
											id="password"
											placeholder="**************"
											required
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Confirm Password */}
										<Form.Label>Confirmación de Contraseña</Form.Label>
										<Form.Control
											type="password"
											id="confirm_password"
											placeholder="**************"
											required
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3">
										{/* Terms and Conditions */}
										<Form.Check type="checkbox" id="termsConditions">
											<Form.Check.Input type="checkbox" required />
											<Form.Check.Label>
												Acepto los
												<Link to="/pages/terms-and-conditions" style={{ color: "#009475" }}>
													{' '}Términos de Servicio
												</Link>
												{' '}y la
												<Link to="/pages/privacy-policy" style={{ color: "#009475" }}>
													{' '}Política de Privacidad.
												</Link>
											</Form.Check.Label>
										</Form.Check>
									</Col>
									<Col lg={12} md={12} className="mb-0 d-grid gap-2">
										<Button type="submit" style={{ backgroundColor: "#042b61", borderColor: "white" }} >
											Registrarse
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

export default SignUp;
