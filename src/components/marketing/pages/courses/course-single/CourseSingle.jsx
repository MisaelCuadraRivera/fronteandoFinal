import React, { Fragment, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Col, Row, Container, Nav, Card, Tab, Image } from 'react-bootstrap';
import Swal from 'sweetalert2';
import CheckedMark from 'assets/images/svg/checked-mark.svg';

// Placeholder para imagen por defecto
const defaultImage = '/path-to-placeholder-image.jpg';

// Función para procesar la imagen
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
    console.error('Error procesando la imagen:', error);
  }
  return defaultImage;
};

const CourseSingle = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/courses/${courseId}`);
        setCourse(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos del curso:', error);
        setError('No se pudo cargar el curso. Intente de nuevo más tarde.');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      await axios.post(
        'http://localhost:3001/enroll',
        { cursoId: courseId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      // Mostrar éxito con SweetAlert2
      Swal.fire({
        title: 'Inscripción realizada',
        text: '¡Te has inscrito correctamente en el curso!',
        icon: 'success',
        confirmButtonColor: '#042b61',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error('Error durante la inscripción:', error.response?.data || error.message);

      // Mostrar error con SweetAlert2
      Swal.fire({
        title: 'Error durante la inscripción',
        text: error.response?.data || 'Ocurrió un error durante la inscripción.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>No se encontró el curso</div>;

  return (
    <Fragment>
      {/* Encabezado de la página */}
      <section className="pt-lg-8 pb-lg-16 pt-8 pb-12" style={{ backgroundColor: "#009475" }}>
        <Container>
          <Row className="align-items-center">
            <Col xl={7} lg={7} md={12} sm={12}>
              <div>
                <h1 className="text-white display-4 fw-semi-bold">{course.title}</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Contenido de la página */}
      <section className="pb-10">
        <Container>
          <Row>
            <Col lg={8} md={12} sm={12} className="mt-n8 mb-4 mb-lg-0">
              <Tab.Container defaultActiveKey="descripción">
                <Card>
                  <Nav className="nav-lb-tab">
                    <Nav.Item>
                      <Nav.Link
                        href="#descripción"
                        eventKey="descripción"
                        className="mb-sm-3 mb-md-0"
                      >
                        Descripción
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Card.Body className="p-0">
                    <Tab.Content>
                      <Tab.Pane eventKey="descripción" className="pb-4 p-4">
                        {course.description}
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Tab.Container>
            </Col>
            <Col lg={4} md={12} sm={12} className="mt-lg-n22">
              {/* Tarjeta de imagen y precio */}
              <Card className="mb-3 mb-4">
                <div className="p-1">
                  <div
                    className="d-flex justify-content-center position-relative rounded py-10 border-white border rounded-3 bg-cover"
                    style={{
                      backgroundImage: `url(${getImageSrc(course.image)})`,
                    }}
                  />
                </div>
                <Card.Body>
                  <div className="mb-3">
                    <span className="text-dark fw-bold h2 me-2">${course.precio}</span>
                  </div>
                  <div className="d-grid">
                    <button
                      onClick={handleEnroll}
                      className="btn"
                      style={{ backgroundColor: "#042b61", color: "white" }}
                    >
                      Inscribirme
                    </button>
                  </div>
                </Card.Body>
              </Card>
              {/* Tarjeta de instructor */}
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <Image
                        src={getImageSrc(course.instructor_image)}
                        alt={course.instructor_name}
                        className="rounded-circle avatar-xl"
                      />
                      <Link
                        to="#"
                        className="position-absolute mt-2 ms-n3"
                        data-bs-toggle="tooltip"
                        data-placement="top"
                        title="Verified"
                      >
                        <Image src={CheckedMark} alt="Verified" height="30" width="30" />
                      </Link>
                    </div>
                    <div className="ms-4">
                      <h4 className="mb-0">{course.instructor_name}</h4>
                      <p className="mb-1 fs-6">{course.category}</p>
                    </div>
                  </div>
                  <Row className="border-top mt-3 border-bottom mb-3 g-0">
                    <Col className="border-start">
                      <div className="pe-1 ps-3 py-3">
                        <h5 className="mb-0">{course.status}</h5>
                        <span>Status</span>
                      </div>
                    </Col>
                    <Col className="border-start">
                      <div className="pe-1 ps-3 py-3">
                        <h5 className="mb-0">{course.applicant_requirements}</h5>
                        <span>Requisitos</span>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default CourseSingle;
