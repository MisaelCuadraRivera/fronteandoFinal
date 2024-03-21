// import node module libraries
import React, { Fragment } from 'react';
import { Col, Row, Image, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import media files.
import MaintenanceModeSVG from 'assets/images/background/maintenance-mode.svg';

const MaintenanceMode = () => {
	return (
		<Fragment>
			<Row className="align-items-center justify-content-center g-0 py-lg-22 py-10">
				<Col
					xl={{ span: 5, offset: 1 }}
					lg={6}
					md={12}
					sm={12}
					className="text-center text-lg-start"
				>
					<h1 className="display-3 mb-2 fw-bold">
						Estamos mejorando el sitio para ti, volveremos pronto.
					</h1>
					<p className="mb-5 fs-4">
						Nos disculpamos por los inconvenientes, pero estamos realizando un mantenimiento. Aún pueden contactarnos en{' '}
						<Link to="mailto:educacioncontinua@utez.edu.mx" style={{color:"#009475"}}>educacioncontinua@utez.edu.mx</Link>.
					</p>
					<hr className="my-5" />
					
				</Col>
				{/*  image */}
				<Col
					xl={{ span: 5, offset: 1 }}
					lg={6}
					md={12}
					sm={12}
					className="mt-8 mt-lg-0"
				>
					<Image src={MaintenanceModeSVG} alt="" className="w-100" />
				</Col>
			</Row>
		</Fragment>
	);
};

export default MaintenanceMode;
