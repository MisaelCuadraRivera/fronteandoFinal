// import node module libraries
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, ListGroup, Dropdown, Image } from 'react-bootstrap';
import axios from 'axios';

// Imagen predeterminada si no hay imagen disponible
const defaultImage = 'https://cdn-icons-png.flaticon.com/512/6326/6326055.png';

// Función para procesar imágenes
const getImageSrc = (image) => {
  try {
    if (image && image.data) {
      // Validar si la imagen ya está en formato base64
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

  // Retornar imagen predeterminada en caso de error
  return defaultImage;
};

const PopularInstructor = ({ title }) => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/instructors');
        const processedInstructors = response.data.map((instructor) => ({
          ...instructor,
          imagen: getImageSrc(instructor.imagen), // Procesar las imágenes
        }));
        setInstructors(processedInstructors);
        console.log('Instructores procesados:', processedInstructors);
      } catch (error) {
        console.error('Error al cargar los instructores:', error);
      }
    };

    fetchInstructors();
  }, []);

  // Custom toggle para el Dropdown
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
              key={item.id}
            >
              <Row>
                <Col xs="auto">
                  <div className="avatar avatar-md avatar-indicators avatar-online">
                    <Image
                      alt="avatar"
                      src={item.imagen || defaultImage} // La imagen ya fue procesada
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
