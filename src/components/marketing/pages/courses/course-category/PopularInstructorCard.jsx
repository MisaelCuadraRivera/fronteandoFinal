import React, { useState, useEffect } from 'react';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import axios from 'axios';

// Imagen predeterminada si no hay imagen disponible
const defaultImage = 'https://cdn-icons-png.flaticon.com/512/6326/6326055.png';

// Función para procesar imágenes
const getImageSrc = (image) => {
  try {
    if (image && image.data) {
      // Verificar si la imagen ya está en base64
      const base64HeaderPattern = /^data:image\/(jpeg|png|gif|webp);base64,/;
      if (base64HeaderPattern.test(String.fromCharCode(...image.data))) {
        return String.fromCharCode(...image.data);
      }

      // Procesar el buffer en base64
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(image.data))
      );
      return `data:image/jpeg;base64,${base64String}`;
    }
  } catch (error) {
    console.error('Error procesando la imagen:', error);
  }

  // Retornar imagen predeterminada si ocurre un error
  return defaultImage;
};

const PopularInstructorCard = ({ item }) => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/instructors');
        const processedInstructors = response.data.map((instructor) => ({
          ...instructor,
          imagen: getImageSrc(instructor.imagen), // Procesar la imagen
        }));
        setInstructors(processedInstructors);
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
                    src={item.imagen || defaultImage} // Imagen procesada o predeterminada
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
