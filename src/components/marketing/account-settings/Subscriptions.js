// import node module libraries
import React, { useState } from 'react';
import { Card, Badge, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import profile layout wrapper
import ProfileLayout from 'components/marketing/student/ProfileLayout';

const Subscriptions = () => {
	const [AutoRenewalState, setAutoRenewalState] = useState(true);

	return (
		<ProfileLayout>
			<Card className="border-0">
				<Card.Header className="d-lg-flex justify-content-between align-items-center">
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Mis cursos</h3>
						<p className="mb-0">
							Los cursos en los que estás inscrito
						</p>
					</div>
					
				</Card.Header>
				<Card.Body>
					<div className="border-bottom pt-0 pb-5">
						<Row className="mb-4">
							<Col lg={6} md={8} sm={7} className="mb-2 mb-lg-0">
								<span className="d-block">
									<span className="h4">Nombre curso</span>{' '}
									<Badge bg="success" className="ms-2">
										Activo
									</Badge>
								</span>
								<p className="mb-0 fs-6">ID: #100010002</p>
							</Col>
						</Row>
						{/* Pricing data */}
						<Row>
							<Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
								<span className="fs-6">Fecha de inicio</span>
								<h6 className="mb-0">Oct 1, 2020</h6>
							</Col>
							<Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
								<span className="fs-6">Precio</span>
								<h6 className="mb-0">$1399</h6>
							</Col>
							<Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
								<span className="fs-6">Acceso</span>
								<h6 className="mb-0">Completo</h6>
							</Col>
							
						</Row>
					</div>
					<div className="pt-5">
						<Row className="mb-4">
							<Col className="mb-2 mb-lg-0">
								<span className="d-block">
									<span className="h4">Nombre curso</span>{' '}
									<Badge bg="danger" className="ms-2">
										Cancelado
									</Badge>
								</span>
								<p className="mb-0 fs-6">ID: #100010001</p>
							</Col>
							<Col xs="auto">
								
							</Col>
						</Row>
						<Row>
							<Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
								<span className="fs-6">Fecha de inicio</span>
								<h6 className="mb-0">Sept 1, 2020</h6>
							</Col>
							<Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
								<span className="fs-6">Precio</span>
								<h6 className="mb-0">$1299</h6>
							</Col>
							<Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
								<span className="fs-6">Acceso</span>
								<h6 className="mb-0">Completo</h6>
							</Col>
							<Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
								
							</Col>
						</Row>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default Subscriptions;
