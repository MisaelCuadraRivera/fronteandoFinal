// import node module libraries
import { useLocation } from 'react-router-dom';
import { Card, Form, Row, Col, Button, Image } from 'react-bootstrap';

// import custom components
import { FormSelect } from 'components/elements/form-select/FormSelect';
import { FlatPickr } from 'components/elements/flat-pickr/FlatPickr';

// import media files
import Avatar3 from 'assets/images/avatar/avatar-3.jpg';

// import profile layout wrapper
import ProfileLayout from 'components/marketing/student/ProfileLayout'; // YA arregle tu mierda

const EditProfile = () => {
	const pathInfo = useLocation();
	const account = pathInfo.pathname.substring(21, 11);
	const statelist = [
		{ value: '1', label: 'Gujarat' },
		{ value: '2', label: 'Rajasthan' },
		{ value: '3', label: 'Maharashtra' }
	];
	const countrylist = [
		{ value: '1', label: 'India' },
		{ value: '2', label: 'UK' },
		{ value: '3', label: 'USA' }
	];
	return (
		<ProfileLayout>
			{account === 'instructor'}
			<Card className="border-0">
				<Card.Header>
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Detalle del perfil</h3>
						<p className="mb-0">
							Configura los datos de tu cuenta.
						</p>
					</div>
				</Card.Header>
				<Card.Body>
					<div className="d-lg-flex align-items-center justify-content-between">
						<div className="d-flex align-items-center mb-4 mb-lg-0">
							<Image
								src={Avatar3}
								id="img-uploaded"
								className="avatar-xl rounded-circle"
								alt=""
							/>
							<div className="ms-3">
								<h4 className="mb-0">Tu avatar</h4>
								<p className="mb-0">
									PNG o JPG no mayor a 800px
								</p>
							</div>
						</div>
						<div>
							<Button variant="outline-secondary" size="sm">
								Actualizar
							</Button>{' '}
							<Button variant="outline-danger" size="sm">
								Eliminar
							</Button>
						</div>
					</div>
					<hr className="my-5" />
					<div>
						<h4 className="mb-0">Detalles Personales</h4>
						<p className="mb-4">Edita tu informacion personal</p>
						{/* Form */}
						<Form>
							<Row>
								{/* First name */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formFirstName">
										<Form.Label>Nombre</Form.Label>
										<Form.Control
											type="text"
											placeholder="Nombre"
											required
										/>
									</Form.Group>
								</Col>

								{/* Last name */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formLastName">
										<Form.Label>Apellido</Form.Label>
										<Form.Control
											type="text"
											placeholder="Apellido"
											required
										/>
									</Form.Group>
								</Col>

								{/* Phone */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formPhone">
										<Form.Label>Telefono</Form.Label>
										<Form.Control type="text" placeholder="Telefono" required />
									</Form.Group>
								</Col>

								{/* Birthday */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formBirthday">
										<Form.Label>Dia de Nacimiento</Form.Label>
										<Form.Control
											as={FlatPickr}
											value={''}
											placeholder="Dia de Nacimiento"
											required
										/>
									</Form.Group>
								</Col>

								{/* Address Line 1 */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formBirthday">
										<Form.Label>Direccion Linea 1</Form.Label>
										<Form.Control
											type="text"
											placeholder="Direccion Linea 1"
											required
										/>
									</Form.Group>
								</Col>

								{/* Address Line 2 */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formBirthday">
										<Form.Label>Direccion Linea 2</Form.Label>
										<Form.Control
											type="text"
											placeholder="Direccion Linea 2"
											required
										/>
									</Form.Group>
								</Col>

								{/* State */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formState">
										<Form.Label>Estado</Form.Label>
										<FormSelect options={statelist} />
									</Form.Group>
								</Col>

								{/* Country */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formState">
										<Form.Label>Pais</Form.Label>
										<FormSelect options={countrylist} />
									</Form.Group>
								</Col>

								{/* Button */}
								<Col sm={12} md={12}>
									<Button variant="primary" type="submit">
										Actualizar Perfil
									</Button>
								</Col>
							</Row>
						</Form>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default EditProfile;
