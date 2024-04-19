// import node module libraries
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, ListGroup, Dropdown, Image } from 'react-bootstrap';
import axios from 'axios';

const PopularInstructor = ({ title }) => {
	const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await axios.get('http://localhost:3001/instructors');
                setInstructors(response.data);
                console.log('Instructores:', response.data); // Añade esto para depurar
            } catch (error) {
                console.error('Error al cargar los instructores:', error);
                // Aquí puedes manejar el error, por ejemplo, estableciendo los instructores a un estado de error o mostrando un mensaje
            }
        };

        fetchInstructors();
    }, []);

	// The forwardRef is important!!
	// Dropdown needs access to the DOM node in order to position the Menu
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<Link
			to=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
			className="btn-icon btn btn-ghost btn-sm rounded-circle"
		>
			{children}
		</Link>
	));


	return (
        <Card className="h-100">
            <Card.Header className="d-flex align-items-center justify-content-between card-header-height">
                <h4 className="mb-0">{title}</h4>
            </Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    {instructors.slice(0, 5).map((item, index) => (
                        <ListGroup.Item
                            className={`px-0 ${index === 0 ? 'pt-0' : ''}`}
                            key={item.id} // Asegúrate de que cada instructor tiene un `id` único
                        >
                            <Row>
                                <Col xs="auto">
                                    <div
                                        className="avatar avatar-md avatar-indicators avatar-online" // Asumimos que todos los instructores están "online", ajusta según tus datos
                                    >
                                        <Image
                                            alt="avatar"
                                            src={`data:image/jpeg;base64,${item.imagen}` || 'https://cdn-icons-png.flaticon.com/512/6326/6326055.png'}
                                            className="rounded-circle"
                                        />
                                    </div>
                                </Col>
                                <Col className="ms-n3">
                                    <h4 className="mb-0 h5">{item.nombre}</h4>
                                    {/* Aquí puedes añadir más información del instructor si es necesario */}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};
export default PopularInstructor;
