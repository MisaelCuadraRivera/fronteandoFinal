import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Col, Row, Nav, Tab, Card, Container } from "react-bootstrap";
import ProfileCover from "components/marketing/common/headers/ProfileCover";
import Avatar3 from "assets/images/avatar/emblema2.png";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : {};
  const avatarSrc = userData.avatar ? `data:image/jpeg;base64,${userData.avatar}` : Avatar3;


  const defaultImage = 'path/to/default-avatar.png';

// Método para procesar las imágenes
const getImageSrc = (image) => {
	try {
	  if (image && image.data) {
		// Validar si la imagen ya está en formato base64
		const base64HeaderPattern = /^data:image\/(jpeg|png|gif|webp);base64,/;
		if (base64HeaderPattern.test(String.fromCharCode(...image.data))) {
		  return String.fromCharCode(...image.data);
		}
  
		// Si no está en base64, procesar el buffer
		const base64String = btoa(
		  String.fromCharCode(...new Uint8Array(image.data))
		);
		return `data:image/jpeg;base64,${base64String}`;
	  }
	} catch (error) {
	  console.error('Error procesando la imagen:', error);
	}
  
	// Retornar imagen por defecto si algo falla
	return defaultImage;
  };

  

  useEffect(() => {
    axios
      .get('http://localhost:3001/my-courses', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        console.log("Cursos inscritos:", response.data); 
        setCourses(response.data);
      })
      .catch(error => {
        console.error("Error fetching enrolled courses: ", error);
        setError("No se pudo cargar la lista de cursos. Intenta nuevamente.");
      });
  }, []);

  const dashboardData = {
    avatar: avatarSrc,
    name: userData.name || "Nombre de Usuario",
    username: userData.username || "correo@ejemplo.com",
    linkname: "Editar Configuración",
    link: "/marketing/student/student-edit-profile/",
  };

  return (
    <Fragment>
      <section className="pt-5 pb-5">
        <Container>
          <ProfileCover dashboardData={dashboardData} />
          <Row className="mb-3">
            <Col className="text-end">
              <Link to={dashboardData.link} className="btn btn-primary mt-2">
                {dashboardData.linkname}
              </Link>
            </Col>
          </Row>

          <Row className="mt-0 mt-md-4">
            <Col lg={12} md={12} sm={12}>
              <Row className="mb-6">
                <Col md={12}>
                  <Tab.Container defaultActiveKey="learning">
                    <Card className="bg-transparent shadow-none">
                      <Card.Header className="border-0 p-0 bg-transparent">
                        <Nav className="nav-lb-tab">
                          <Nav.Item>
                            <Nav.Link eventKey="learning" className="mb-sm-3 mb-md-0">
                              En Curso
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Card.Header>
                      <Card.Body className="p-0">
                        <Tab.Content>
                          <Tab.Pane eventKey="learning" className="pb-4 p-4 ps-0 pe-0">
                            <Row>
                              {error ? (
                                <Col>
                                  <p className="text-danger">{error}</p>
                                </Col>
                              ) : courses.length > 0 ? (
                                courses.map((course) => (
                                  <Col lg={3} md={6} sm={12} key={course.id}>
                                    <Card>
                                    <Card.Img
                                        variant="top"
                                        src={getImageSrc(course.course_image)}
                                        alt={course.title}
                                      />
                                      <Card.Body>
                                        <Card.Title>{course.title}</Card.Title>
                                        <Card.Text>{course.description}</Card.Text>
                                        <p><strong>Instructor:</strong> {course.instructor_name}</p>
                                        <p><strong>Categoría:</strong> {course.category}</p>
                                        <p><strong>Nivel:</strong> {course.level}</p>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                ))
                              ) : (
                                <Col>
                                  <p>No estás inscrito en ningún curso.</p>
                                </Col>
                              )}
                            </Row>
                          </Tab.Pane>
                        </Tab.Content>
                      </Card.Body>
                    </Card>
                  </Tab.Container>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default StudentDashboard;
