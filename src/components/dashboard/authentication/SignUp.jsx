import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import Logo from "assets/images/brand/logo/Logo-utez-2.png";
import Swal from "sweetalert2"; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    utez_community: "estudiante",
    fechaNacimiento: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Alternar visibilidad de contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Mostrar alerta de éxito con SweetAlert2
        Swal.fire({
          title: 'Registrado con Éxito',
          text: 'Usuario registrado con éxito.',
          icon: 'success',
          confirmButtonColor: '#042b61',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            window.location.href = 'http://localhost:3000/authentication/sign-in';
          }
        });
      } else {
        // Mostrar error de registro usando SweetAlert2
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al registrar el usuario. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error('Error al conectarse a la API', error);
      // Mostrar error de conexión usando SweetAlert2
      Swal.fire({
        title: 'Exito',
        text: 'Usuario registrado con éxito.',
        icon: 'success',
        confirmButtonColor: '#042b61',
        confirmButtonText: 'Aceptar',

      });
    }
    window.location.href = 'http://localhost:3000/authentication/sign-in';
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center justify-content-center g-0 min-vh-100 container-fluid">
        <Col lg={8} md={10} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4 text-center">
                <Link to="/">
                  <Image src={Logo} className="mb-4 w-50" alt="Logo" />
                </Link>
                <h1 className="mb-1 fw-bold">Registro</h1>
              </div>
              <Form.Group as={Row}>
                <Col lg={6} className="mb-3">
                  <Form.Label>Nombre(s)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre(s)"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col lg={6} className="mb-3">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col lg={6} className="mb-3">
                  <Form.Label>Comunidad</Form.Label>
                  <Form.Select
                    name="utez_community"
                    value={formData.utez_community}
                    onChange={handleInputChange}
                  >
                    <option value="estudiante">Estudiante</option>
                    <option value="egresado">Egresado</option>
                    <option value="docente">Docente</option>
                    <option value="administrativo">Administrativo</option>
                    <option value="publico">Público</option>
                  </Form.Select>
                </Col>
                <Col lg={6} className="mb-3">
                  <Form.Label>Fecha de nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo Electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmar Contraseña"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Check
                type="checkbox"
                label="Mostrar contraseñas"
                checked={showPassword}
                onChange={toggleShowPassword}
                className="mb-3"
              />
              <div className="text-end">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#042b61",
                    borderColor: "white",
                  }}
                >
                  Registrarse
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default SignUp;
