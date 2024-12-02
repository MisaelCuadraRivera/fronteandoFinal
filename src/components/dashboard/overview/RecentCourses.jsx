// import node module libraries
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, ListGroup, Dropdown, Image } from "react-bootstrap";
import axios from "axios";

// Placeholder image para cuando no haya imagen disponible
const defaultImage = "/path-to-placeholder-image.jpg";

// Función para procesar imágenes
const getImageSrc = (image) => {
  try {
    if (image && image.data) {
      const base64HeaderPattern = /^data:image\/(jpeg|png|gif|webp);base64,/;
      if (base64HeaderPattern.test(String.fromCharCode(...image.data))) {
        return String.fromCharCode(...image.data);
      }

      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(image.data))
      );
      return `data:image/jpeg;base64,${base64String}`;
    }
  } catch (error) {
    console.error("Error procesando la imagen:", error);
  }
  return defaultImage;
};

const RecentCourses = ({ title }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recent-courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error al cargar los cursos recientes:", error);
      }
    };

    fetchCourses();
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
          {courses.map((item, index) => (
            <ListGroup.Item
              className={`px-0 ${index === 0 ? "pt-0" : ""}`}
              key={item.id}
            >
              <Row>
                <Col xs="auto">
                  <Link to="#">
                    <Image
                      src={getImageSrc(item.image)} // Procesar la imagen aquí
                      alt={item.title}
                      className="img-fluid rounded img-4by3-lg"
                    />
                  </Link>
                </Col>
                <Col className="ps-0">
                  <Link to="#">
                    <h5 className="text-primary-hover">{item.title}</h5>
                  </Link>
                  <div className="d-flex align-items-center">
                    <span className="fs-6">{item.category}</span>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default RecentCourses;
