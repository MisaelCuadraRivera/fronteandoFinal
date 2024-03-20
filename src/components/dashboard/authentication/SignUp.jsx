import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';

// Importa tus imágenes
import Logo from 'assets/images/brand/logo/Logo-utez-2.png';

const SignUp = () => {
	const [step, setStep] = useState(1);

	// Avanzar al siguiente paso
	const nextStep = () => {
		setStep(step + 1);
	};

	// Regresar al paso anterior
	const prevStep = () => {
		setStep(step - 1);
	};

	// Renderizar formulario basado en el paso
	const renderForm = () => {
		switch (step) {
			case 1:
				return (
					// Paso 1: Información Personal
					<Fragment>
						<Form.Group as={Row}>
							<Col lg={6} className="mb-3">
								<Form.Label>Nombre(s)</Form.Label>
								<Form.Control type="text" placeholder="Nombre(s)" required />
							</Col>
							<Col lg={6} className="mb-3">
								<Form.Label>Apellidos</Form.Label>
								<Form.Control type="text" placeholder="Apellidos" required />
							</Col>
						</Form.Group>
						<Form.Group as={Row}>
							<Col lg={6} className="mb-3">
								<Form.Label>Sexo</Form.Label>
								<Form.Select>
									<option>Selecciona tu sexo</option>
									<option value="male">Masculino</option>
									<option value="female">Femenino</option>
									<option value="other">Otro</option>
								</Form.Select>
							</Col>
							<Col lg={6} className="mb-3">
								<Form.Label>Fecha de nacimiento</Form.Label>
								<Form.Control type="date" required />
							</Col>
						</Form.Group>
						<div className='text-end container'>
							<Button onClick={nextStep} style={{ backgroundColor: "#042b61", borderColor: "white" }}>Siguiente</Button>
						</div>
					</Fragment>
				);
			case 2:
				return (
					// Paso 2: Contacto e Idioma
					<Fragment>
						<Form.Group as={Row} className="mb-3">
							<h4>Contacto e idioma</h4>
							<Col lg={12}>
								<Form.Label>Número de Celular</Form.Label>
								<Form.Control type="tel" placeholder="Número de Celular" required />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3">
							<Col lg={12}>
								<Form.Label>¿Hablas alguna lengua indígena?</Form.Label>
								<Form.Check type="radio" label="Sí" name="indigenousLanguage" className="mb-2" />
								<Form.Check type="radio" label="No" name="indigenousLanguage" />
							</Col>
						</Form.Group>
						<div className='text-end container'>
							<Button variant="secondary" onClick={prevStep}>Anterior</Button>{' '}
							<Button onClick={nextStep} style={{ backgroundColor: "#042b61", borderColor: "white" }}>Siguiente</Button>
						</div>

					</Fragment>
				);
			case 3:
				return (
					// Paso 3: Educación y Credenciales
					<Fragment>
						<Form.Group as={Row} className="mb-3">
							<Col lg={12}>
								<Form.Label>Nivel Máximo Cursado</Form.Label>
								<Form.Select>
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
						</Form.Group>
						<Form.Group as={Row} className="mb-3">
							<Col lg={12}>
								<Form.Label>Correo Electrónico</Form.Label>
								<Form.Control type="email" placeholder="Correo Electrónico" required />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3">
							<Col lg={12}>
								<Form.Label>Contraseña</Form.Label>
								<Form.Control type="password" placeholder="********" required />
							</Col>
						</Form.Group>
						<div className='container text-end'>
							<Button variant="secondary" onClick={prevStep}>Anterior</Button>{' '}
							<Button style={{ backgroundColor: "#042b61", borderColor: "white" }} type="submit">Registrarse</Button>
						</div>

					</Fragment>
				);
			default:
				// No debería ocurrir, pero bueno para la captura de errores
				return <Fragment></Fragment>;
		}
	};

	return (
		<Fragment>
			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={8} md={10} className="py-8 py-xl-0">
					<Card>
						<Card.Body className="p-6">
							<div className="mb-4 text-center">
								<Link to="/">
									<Image src={Logo} className="mb-4 w-50" alt="Logo" />
								</Link>
								<h1 className="mb-1 fw-bold">Registro</h1>
								{/* Otros elementos de UI aquí */}
							</div>
							{/* Renderizado condicional del formulario basado en el paso */}
							{renderForm()}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default SignUp;
