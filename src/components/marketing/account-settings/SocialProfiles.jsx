// import node module libraries
import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

// import profile layout wrapper
import ProfileLayoutWrap from './ProfileLayoutWrap';

const SocialProfiles = () => {
	const location = useLocation();

	return (
		<ProfileLayoutWrap pathpara={location.pathname}>
			<Card className="border-0">
				<Card.Header>
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Perfil Social</h3>
					</div>
				</Card.Header>
				<Card.Body>
					<Form>
						{/*  Twitter  */}
						<Row className="mb-5">
							<Col lg={3} md={4} sm={12}>
								<h5>Twitter</h5>
							</Col>
							<Col lg={9} md={8} sm={12}>
								<Form.Control
									type="text"
									placeholder="Usuario de Twitter"
									className="form-control mb-1"
								/>
								<Form.Text className="text-muted">
									Agrega tu usuario de Twitter.
								</Form.Text>
							</Col>
						</Row>
						{/*  Facebook  */}
						<Row className="mb-5">
							<Col lg={3} md={4} sm={12}>
								<h5>Facebook</h5>
							</Col>
							<Col lg={9} md={8} sm={12}>
								<Form.Control
									type="text"
									placeholder="Usuario de Facebook"
									className="form-control mb-1"
								/>
								<Form.Text className="text-muted">
									Agrega tu usuario de Facebook
								</Form.Text>
							</Col>
						</Row>
						{/*  Instagram  */}
						<Row className="mb-5">
							<Col lg={3} md={4} sm={12}>
								<h5>Instagram</h5>
							</Col>
							<Col lg={9} md={8} sm={12}>
								<Form.Control
									type="text"
									placeholder="Usuario de Instagram"
									className="form-control mb-1"
								/>
								<Form.Text className="text-muted">
									Agrega tu usuario de Instagram
								</Form.Text>
							</Col>
						</Row>
						{/*  Linked in  */}
						
						{/*  Youtube  */}
						<Row className="mb-3">
							<Col lg={3} md={4} sm={12}>
								<h5>YouTube</h5>
							</Col>
							<Col lg={9} md={8} sm={12}>
								<Form.Control
									type="text"
									placeholder="YouTube Link"
									className="form-control mb-1"
								/>
								<Form.Text className="text-muted">
									Agrega tu link de Youtube
								</Form.Text>
							</Col>
						</Row>
						{/*  Button  */}
						<Row>
							<Col lg={{ span: 6, offset: 3 }} sm={12}>
								<Button variant="primary" type="submit">
									Guardar información
								</Button>
							</Col>
						</Row>
					</Form>
				</Card.Body>
			</Card>
		</ProfileLayoutWrap>
	);
};

export default SocialProfiles;
