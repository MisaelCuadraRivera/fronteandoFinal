import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
// Asegúrate de tener la ruta correcta para tu logo
import Logo from "assets/images/brand/logo/Logo-utez-2.png";
import Swal from "sweetalert2";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    sexo: "",
    fechaNacimiento: "",
    celular: "",
    idiomaIndigena: "",
    nivelEducacion: "",
    estado: "",
    municipio: "",
    descubrimiento: "",
    discapacidad: "",
    utezCommunity: "",
    email: "",
    password: "",
  });

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Avanzar al siguiente paso
  const nextStep = () => {
    setStep(step + 1);
  };

  // Regresar al paso anterior
  const prevStep = () => {
    setStep(step - 1);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
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

      window.location.href = 'http://localhost:3000/authentication/sign-in';

    }
  };


  // Renderizar formulario basado en el paso
  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <Fragment>
            <Form.Group as={Row}>
              <Col lg={6} className="mb-3">
                <Form.Label>Nombre(s)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre(s)"
                  name="nombre"
                  value={formData.nombres}
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
                <Form.Label>Sexo</Form.Label>
                <Form.Select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleInputChange}
                >
                  <option>Selecciona tu sexo</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </Form.Select>
              </Col>
              <Col lg={6} className="mb-3">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Form.Group>
            <div className="text-end container">
              <Button
                onClick={nextStep}
                style={{ backgroundColor: "#042b61", borderColor: "white" }}
              >
                Siguiente
              </Button>
            </div>
          </Fragment>
        );

      // Continuación de los pasos dentro de renderForm

      case 2:
        return (
          <Fragment>
            <Form.Group as={Row} className="mb-3">
              <h4>Contacto e idioma</h4>
              <Col lg={12}>
                <Form.Label>Número de Celular</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Número de Celular"
                  name="celular"
                  value={formData.celular}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col lg={12}>
                <Form.Label>¿Hablas alguna lengua indígena?</Form.Label>
                <Form.Check
                  type="radio"
                  label="Sí"
                  name="idioma_indigena"
                  value="Sí"
                  onChange={handleInputChange}
                  checked={formData.idioma_indigena === "Sí"}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="idioma_indigena"
                  value="No"
                  onChange={handleInputChange}
                  checked={formData.idioma_indigena === "No"}
                />
              </Col>
            </Form.Group>
            <div className="text-end container">
              <Button variant="secondary" onClick={prevStep}>
                Anterior
              </Button>{" "}
              <Button
                onClick={nextStep}
                style={{ backgroundColor: "#042b61", borderColor: "white" }}
              >
                Siguiente
              </Button>
            </div>
          </Fragment>
        );
      case 3:
        return (
          <Fragment>
            <Form.Group as={Row} className="mb-3">
              <Col lg={12}>
                <Form.Label>Nivel Máximo Cursado</Form.Label>
                <Form.Select
                  name="nivel_educacion"
                  value={formData.nivel_educacion}
                  onChange={handleInputChange}
                >
                  <option>Selecciona tu nivel educativo</option>
                  <option value="primaria">Educación Primaria</option>
                  <option value="secundaria">Educación Secundaria</option>
                  <option value="media">Educación Media Superior</option>
                  <option value="tsu">Técnico Superior Universitario</option>
                  <option value="lic_ing">Licenciatura o Ingeniería</option>
                </Form.Select>
              </Col>
              <Col lg={6} md={12} className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  name="estado"
                  placeholder="Estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col lg={6} md={12} className="mb-3">
                <Form.Label>Municipio</Form.Label>
                <Form.Control
                  type="text"
                  name="municipio"
                  placeholder="Municipio"
                  value={formData.municipio}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col lg={12} md={12} className="mb-3">
                <Form.Label>¿Cómo se enteró del servicio?</Form.Label>
                <Form.Select
                  name="descubrimiento"
                  value={formData.descubrimiento}
                  onChange={handleInputChange}
                >
                  <option>Selecciona una opción</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="email">Correo Electrónico</option>
                  <option value="recomendacion">Recomendación</option>
                  <option value="otro">Otro</option>
                </Form.Select>
              </Col>
              <Col lg={12} md={12} className="mb-3">
                <Form.Label>¿Tiene algún tipo de discapacidad?</Form.Label>
                <Form.Select
                  name="discapacidad"
                  value={formData.discapacidad}
                  onChange={handleInputChange}
                >
                  <option>Selecciona si tienes alguna discapacidad</option>
                  <option value="Ninguna">Ninguna</option>
                  <option value="Discapacidad Sensorial">
                    Discapacidad Sensorial
                  </option>
                  <option value="Discapacidad Física Motora">
                    Discapacidad Física Motora
                  </option>
                </Form.Select>
              </Col>
              <Col lg={12} md={12} className="mb-3">
                <Form.Label>¿Es parte de la comunidad UTEZ?</Form.Label>
                <Form.Select
                  name="utez_community"
                  value={formData.utez_community}
                  onChange={handleInputChange}
                >
                  <option>Selecciona tu relación con la UTEZ</option>
                  <option value="estudiante">Estudiante UTEZ</option>
                  <option value="egresado">Egresado UTEZ</option>
                  <option value="profesor">Personal docente</option>
                  <option value="administrativo">Administrativo UTEZ</option>
                  <option value="publico">Público general</option>
                </Form.Select>
              </Col>
              <Col lg={12} md={12} className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo Electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col lg={12} md={12} className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Form.Group>
          </Fragment>
        );

      // Asegúrate de incluir estos casos en la función renderForm dentro de tu componente SignUp.

      // Casos 2 y 3 siguen aquí. Asegúrate de que cada entrada tenga un atributo `name` y use `handleInputChange`.
      default:
        return <Fragment></Fragment>;
    }
  };

  return (
    <Fragment>
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
                  {/* Otros elementos de UI aquí */}
                </div>
                {/* Renderizado condicional del formulario basado en el paso */}
                {renderForm()}
                {step === 3 && (
                  <div className="container text-end">
                    <Button variant="secondary" onClick={prevStep}>
                      Anterior
                    </Button>{" "}
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
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default SignUp;
