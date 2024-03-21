// import node module libraries
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

// import profile layout wrapper
import ProfileLayoutWrap from './ProfileLayoutWrap';

const DeleteProfile = () => {
	const location = useLocation();

	return (
		<ProfileLayoutWrap pathpara={location.pathname}>
			<Card className="border-0">
				<Card.Header>
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Eliminar Cuenta</h3>
					</div>
				</Card.Header>
				<Card.Body>
					<span className="text-danger h4">Advertencia.</span>
					<p>
					Si cierras tu cuenta, serás dado de baja de todos tus 0 cursos y perderás el acceso para siempre.
					</p>
					<Link to="/" className="btn btn-danger">
						Cerrar mi cuenta
					</Link>
				</Card.Body>
			</Card>
		</ProfileLayoutWrap>
	);
};

export default DeleteProfile;
