// import node module libraries
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Trash, XCircle, Copy } from 'react-feather';
import {
	Col,
	Row,
	Breadcrumb,
	Card,
	Button,
	Form,
	InputGroup,
	FormControl,
	ListGroup,
	Image,
	Badge
} from 'react-bootstrap';

// import custom components
import { FormSelect } from 'components/elements/form-select/FormSelect';
import DotBadge from 'components/elements/bootstrap/DotBadge';

// import media files
import Avatar1 from 'assets/images/avatar/avatar-1.jpg';

const AddNewPost = () => {
	const initialValue = `<h4>Esto es un ejemplo</h4>`;

	const categoryOptions = [
		{ value: 'course', label: 'Course' },
		{ value: 'post-category', label: 'Post Category' },
		{ value: 'workshop', label: 'Workshop' },
		{ value: 'marketing', label: 'Marketing' }
	];

	return (
		<Fragment>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-1 h2 fw-bold">Agregar nuevo evento</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item href="#">Gestion de eventos</Breadcrumb.Item>
								<Breadcrumb.Item active>Tipos de eventos</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<Link to="/cms/all-posts" className="btn btn-outline-secondary ">
								Regresar a listado de eventos
							</Link>
						</div>
					</div>
				</Col>
			</Row>

			<Row>
				<Col xl={9} lg={8} md={12} sm={12}>
					<Card>
						<Card.Header>
							<h4 className="mb-0">Crear evento</h4>
						</Card.Header>
						<Card.Body>
							<Button variant="outline-secondary" className="me-1 mb-1">
								<i className="fe fe-image me-1"></i> Foto
							</Button>

							<Button variant="outline-secondary" className="me-1 mb-1">
								<i className="fe fe-video me-1"></i> Video
							</Button>

							<Button variant="outline-secondary" className="me-1 mb-1">
								Parrafo
							</Button>

							<Button variant="outline-secondary" className="mb-1">
								<i className="fe fe-link me-1"></i> Link
							</Button>

							<Form
								action="#"
								className="dropzone mt-4 p-4 border-dashed text-center"
							>
							</Form>

							{/*  Form  */}
							<Form className="mt-4">
								<Row>
									<Col md={9} sm={12}>
										{/* Date */}
										<Form.Group className="mb-3">
											<Form.Label htmlFor="selectDate">Fecha</Form.Label>
										</Form.Group>

										{/* Title  */}
										<Form.Group className="mb-3">
											<Form.Label htmlFor="postTitle">Titulo</Form.Label>
											<Form.Control
												type="text"
												placeholder="Post Title"
												id="postTitle"
											/>
											<Form.Text className="text-muted">
												Manten tus eventos con valor maximo a 60 caracteres.
											</Form.Text>
										</Form.Group>

										{/*   Slug  */}
										<Form.Group className="mb-3">
											<Form.Label htmlFor="basic-url">Identificador</Form.Label>
											<InputGroup>
												<InputGroup.Text id="basic-addon3">
													https://ejemplo.com/
												</InputGroup.Text>
												<FormControl
													id="basic-url"
													aria-describedby="basic-addon3"
													placeholder="designcourses"
												/>
											</InputGroup>
											<Form.Text className="text-muted">
												{' '}
												El campo debe tener un valor unico
											</Form.Text>
										</Form.Group>

										{/* Excerpt */}
										<Form.Group className="mb-3">
											<Form.Label htmlFor="Excerpt">Descripcion</Form.Label>
											<Form.Control
												as="textarea"
												placeholder="Descripcion"
												id="Excerpt"
												style={{ height: '100px' }}
											/>
										</Form.Group>

										{/* Category */}
										<Form.Group className="mb-3">
											<Form.Label>Categoria</Form.Label>
											<FormSelect options={categoryOptions} />
										</Form.Group>
									</Col>

									<Col lg={12} md={12} sm={12}>
										{/* Editor */}
										<Form.Group className="mb-3">
										</Form.Group>
										{/* button */}
										<Form.Group className="mb-3">
											<Button variant="primary" className="m-1">
												Publicar
											</Button>
											<Button variant="outline-secondary">Guardar Borrador</Button>
										</Form.Group>
									</Col>
								</Row>
							</Form>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={3} lg={4} md={12} sm={12}>
					{/*  List group  */}
					<Card className="mt-4 mt-lg-0 mb-4">
						<Card.Header className="d-lg-flex">
							<h4 className="mb-0">Info Evento</h4>
						</Card.Header>
						<Card.Body className="p-0">
							{/*  List group  */}
							<ListGroup variant="flush">
								<ListGroup.Item>
									<span className="text-body">Evento ID</span>
									<h5>8693637308</h5>
								</ListGroup.Item>
								<ListGroup.Item>
									<span className="text-body">Status</span>
									<h5>
										<DotBadge bg="success">
											Publicado (unsaved changes)
										</DotBadge>
									</h5>
								</ListGroup.Item>
								<ListGroup.Item>
									<span className="text-body">Creado por</span>
									<div className="d-flex mt-2">
										<Image
											src={Avatar1}
											alt=""
											className="avatar-sm rounded-circle"
										/>
										<div className="ms-2">
											<h5 className="mb-n1">Keila Lizalde</h5>
											<small>Admin</small>
										</div>
									</div>
								</ListGroup.Item>
								<ListGroup.Item>
									<span className="text-body">Fecha de creacion</span>
									<h5>Mar 20, 2:21 PM</h5>
								</ListGroup.Item>
								<ListGroup.Item>
									<span className="text-body">Primera actualizacion</span>
									<h5>Mar 21, 2:21 PM</h5>
								</ListGroup.Item>
								<ListGroup.Item>
									<span className="text-body">Ultima actualizacion</span>
									<h5>Mar  21, 12:21 PM</h5>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>

					<Card className="mt-4 mt-lg-0 mb-4">
						<Card.Header className="d-lg-flex">
							<h4 className="mb-0">Acciones</h4>
						</Card.Header>
						<Card.Body className="p-0">
							{/*  List group  */}
							<ListGroup variant="flush">
								<ListGroup.Item className="d-flex justify-content-between align-items-center">
									<span className="text-body">Archivar</span>
									<Link to="#" className="text-inherit">
										<XCircle size="18px" />{' '}
									</Link>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-between align-items-center">
									<span className="text-body">Duplicar</span>
									<Link to="#" className="text-inherit">
										<Copy size="18px" />
									</Link>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent">
									<span className="text-body">Eliminar</span>
									<Link to="#">
										<Trash size="18px" className="text-danger" />
									</Link>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>

					<Card className="mt-4 mt-lg-0 mb-4">
						<Card.Header className="d-lg-flex">
							<h4 className="mb-0">Historial de revisiones</h4>
						</Card.Header>
						<Card.Body className="p-0">
							{/*  List group  */}
							<ListGroup variant="flush">
								<ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent">
									<div>
										<h5 className="mb-0">Mar 31, 12:21 PM</h5>
										<span className="text-body">Keila Lizalde</span>
									</div>
									<div>
										<Badge bg="success">Archivado</Badge>
									</div>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AddNewPost;
