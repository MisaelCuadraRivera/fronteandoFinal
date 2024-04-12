import React, { useState, useEffect } from 'react';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import axios from 'axios';

const PopularInstructorCard = ({ item }) => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/instructors');
        setInstructors(response.data);
      } catch (error) {
        console.error('Error al cargar los instructores:', error);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <Card className="mb-4 ">
      <Card.Body>
        <ListGroup variant="flush">
          {instructors.map((item, index) => (
            <ListGroup.Item key={item.id}>
              <Row className="align-items-center">
                <Col xs="auto">
                  <Image
                    src={`data:image/jpeg;base64,${item.imagen}` || 'https://cdn-icons-png.flaticon.com/512/6326/6326055.png'}
                    className="rounded-circle avatar-xl"
                    alt={item.nombre}
                  />
                </Col>
                <Col>
                  <h4 className="mb-0">{item.nombre}</h4>
				  <h4 className="mb-0">{item.estado}</h4>
                  <p className="mb-0 fs-6 text-muted">{item.email}</p>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default PopularInstructorCard;