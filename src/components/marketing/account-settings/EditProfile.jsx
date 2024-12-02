import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import ProfileLayout from 'components/marketing/instructor/ProfileLayout';
import Avatar3 from 'assets/images/avatar/emblema2.png';
import Swal from "sweetalert2";

const EditProfile = () => {
  const MAX_IMAGE_SIZE = 83 * 1024; // Tamaño máximo permitido (83 KB)

  const [userData, setUserData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    fecha_nacimiento: '',
    imagen: Avatar3, // Imagen predeterminada
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3001/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos del usuario');
        }
        const data = await response.json();
        setUserData({
          ...data.user,
          imagen: data.user.imagen || Avatar3, // Si no hay imagen, usa la predeterminada
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Archivo no válido",
        text: "Por favor selecciona un archivo.",
        confirmButtonText: "Aceptar",
      });
      e.target.value = null;
      return;
    }

    const validExtensions = ["image/jpeg", "image/png", "image/gif"];
    if (!validExtensions.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Formato no soportado",
        text: "Selecciona una imagen en formato .jpg, .jpeg, .png o .gif.",
        confirmButtonText: "Aceptar",
      });
      e.target.value = null;
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      Swal.fire({
        icon: "error",
        title: "Imagen demasiado pesada",
        text: `El tamaño máximo permitido es 83 KB. La imagen seleccionada pesa ${(file.size / 1024).toFixed(2)} KB.`,
        confirmButtonText: "Aceptar",
      });
      e.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUserData((prev) => ({
        ...prev,
        imagen: reader.result, // Actualiza el estado solo si la imagen es válida
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const userProfileData = {
      nombre: userData.nombre,
      apellidos: userData.apellidos,
      fecha_nacimiento: userData.fecha_nacimiento,
      imagen: userData.imagen, // Envía la imagen en base64
    };

    try {
      const response = await fetch('http://localhost:3001/user/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfileData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos del usuario');
      }

      Swal.fire({
        icon: "success",
        title: "Perfil actualizado",
        text: "Los datos del perfil se han actualizado correctamente.",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al actualizar el perfil. Inténtalo nuevamente.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <ProfileLayout>
      <Card className="border-0">
        <Card.Header>
          <h3 className="mb-0">Editar Perfil</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleUpdateProfile}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={userData.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="apellidos">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={userData.apellidos}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="fecha_nacimiento" style={{ marginTop: '10px' }}>
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_nacimiento"
                    value={userData.fecha_nacimiento}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="imagenPerfil" style={{ marginTop: '10px' }}>
              <Form.Label>Imagen de Perfil</Form.Label>
              <InputGroup>
                <FormControl
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className='btn mt-2'>
              Actualizar Perfil
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </ProfileLayout>
  );
};

export default EditProfile;
