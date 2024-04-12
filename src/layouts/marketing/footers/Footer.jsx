// import node module libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

const Footer = ({ bgColor }) => {
	return (
		<footer className={`footer ${bgColor}`}>
			<Container>
				<Row className="align-items-center g-0 border-top py-2">
					{/* Desc */}
					<Col md={6} sm={12} className="text-center text-md-center">
						<span>© 2024 UTEZ. Todos los derechos reservados.</span>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

// Specifies the default values for props
Footer.defaultProps = {
	bgColor: 'bg-transparent'
};

// Typechecking With PropTypes
Footer.propTypes = {
	bgColor: PropTypes.string
};

export default Footer;
