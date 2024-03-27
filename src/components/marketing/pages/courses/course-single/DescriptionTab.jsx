// import node module libraries
import { Fragment } from 'react';
import { Col, Row, ListGroup } from 'react-bootstrap';

const DescriptionTab = () => {
	return (
		<Fragment>
			<div className="mb-4">
				<h3 className="mb-2">Descripción del curso</h3>
				<p>
					Si estás aprendiendo a programar por primera vez, o si vienes de un lenguaje diferente, este curso, JavaScript:
					Comenzando, te dará las bases para codificar en JavaScript. Primero, descubrirás los tipos de aplicaciones que se pueden construir
					con JavaScript y las plataformas en las que se ejecutarán.
				</p>
				<p>
					A continuación, explorarás los conceptos básicos del lenguaje, proporcionando abundantes ejemplos.
					Finalmente, pondrás a prueba tus conocimientos de JavaScript y modificarás una página web moderna y
					adaptable. Cuando hayas terminado con este curso, tendrás las habilidades
					y conocimientos en JavaScript para crear programas simples, desarrollar aplicaciones
					web sencillas y modificar páginas web.
				</p>
			</div>
			<h4 className="mb-3">Lo que aprenderás</h4>
			<Row className="mb-3">
				<Col lg={6} md={6} sm={12}>
					<ListGroup bsPrefix="list-unstyled" variant="flush">
						<ListGroup.Item bsPrefix=" " className="d-flex mb-2">
							<i className="far fa-check-circle text-success me-2 mt-2"></i>
							<span>
								Reconoce la importancia de entender tus objetivos al dirigirte a una audiencia.
							</span>
						</ListGroup.Item>
						<ListGroup.Item bsPrefix=" " className="d-flex mb-2">
							<i className="far fa-check-circle text-success me-2 mt-2"></i>
							<span>
								Identifica los fundamentos para componer un cierre exitoso.
							</span>
						</ListGroup.Item>
						<ListGroup.Item bsPrefix=" " className="d-flex mb-2">
							<i className="far fa-check-circle text-success me-2 mt-2"></i>
							<span>
								Explora cómo conectar con tu audiencia a través de la creación de historias convincentes.
							</span>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col lg={6} md={6} sm={12}>
					<ListGroup bsPrefix="list-unstyled" variant="flush">
						<ListGroup.Item bsPrefix=" " className="d-flex mb-2">
							<i className="far fa-check-circle text-success me-2 mt-1"></i>{' '}
							<span>
							Examina formas de conectar con tu audiencia personalizando tu contenido.
							</span>
						</ListGroup.Item>
						<ListGroup.Item bsPrefix=" " className="d-flex mb-2">
							<i className="far fa-check-circle text-success me-2 mt-1"></i>
							<span>Break down the best ways to exude executive presence.</span>
						</ListGroup.Item>
						<ListGroup.Item bsPrefix=" " className="d-flex mb-2">
							<i className="far fa-check-circle text-success me-2 mt-1"></i>
							<span>
								Explore how to communicate the unknown in an impromptu
								communication.
							</span>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
			<p>
				Maecenas viverra condimentum nulla molestie condimentum. Nunc ex libero,
				feugiat quis lectus vel, ornare euismod ligula. Aenean sit amet arcu
				nulla.
			</p>
			<p>
				Duis facilisis ex a urna blandit ultricies. Nullam sagittis ligula non
				eros semper, nec mattis odio ullamcorper. Phasellus feugiat sit amet leo
				eget consectetur.
			</p>
		</Fragment>
	);
};
export default DescriptionTab;
