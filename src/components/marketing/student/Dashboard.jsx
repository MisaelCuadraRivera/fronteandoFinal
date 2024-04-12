import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Col, Row, Nav, Tab, Card, Container } from "react-bootstrap";
import CourseCard from "components/marketing/pages/courses/CourseCard";
import ProfileCover from "components/marketing/common/headers/ProfileCover";
import Avatar3 from "assets/images/avatar/avatar-3.jpg";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : {};
  const avatarSrc = userData.avatar ? `data:image/jpeg;base64,${userData.avatar}` : Avatar3;

  useEffect(() => {
    axios.get('http://localhost:3001/api/mis-cursos', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("Error fetching enrolled courses: ", error);
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
                  <Tab.Container defaultActiveKey="bookmarked">
                    <Card className="bg-transparent shadow-none ">
                      <Card.Header className="border-0 p-0 bg-transparent">
                        <Nav className="nav-lb-tab">
                          <Nav.Item>
                            <Nav.Link eventKey="learning" className="mb-sm-3 mb-md-0">En Curso</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Card.Header>
                      <Card.Body className="p-0">
                        <Tab.Content>
                          <Tab.Pane eventKey="bookmarked" className="pb-4 p-4 ps-0 pe-0">
                            <Row>
                              {courses.map((course) => (
                                <Col lg={3} md={6} sm={12} key={course.id}>
                                  <CourseCard course={course} />
                                </Col>
                              ))}
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
