import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Button, Image, InputGroup, FormControl } from 'react-bootstrap';
import ProfileLayout from 'components/marketing/instructor/ProfileLayout'; // Asegúrate de ajustar la importación según tu estructura de archivos
import Avatar3 from 'assets/images/avatar/avatar-3.jpg'; // Asegúrate de ajustar la ruta según tu proyecto

const EditProfile = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    celular: '',
    fecha_nacimiento: '',
    estado: '',
    municipio: '',
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
          imagen: data.user.imagen || Avatar3,
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserData();
  }, []);

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Manejador para el cambio de imagen
  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);

      // Extrae solo la parte base64 de la cadena
      const base64Data = base64.split(',')[1];

      setUserData({
        ...userData,
        imagen: base64Data,
      });
    }
  };

  // Función para convertir imagen a Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Función para manejar la actualización del perfil
  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const userProfileData = {
      nombre: userData.nombre,
      apellidos: userData.apellidos,
      celular: userData.celular,
      fecha_nacimiento: userData.fecha_nacimiento,
      estado: userData.estado,
      municipio: userData.municipio,
      imagen: userData.imagen, // Envía la imagen en base64
    };

    try {
      const response = await fetch('http://localhost:3001/user/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Asegúrate de incluir este encabezado
        },
        body: JSON.stringify(userProfileData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos del usuario');
      }

      alert('Perfil actualizado con éxito');
    } catch (error) {
      console.error(error.message);
      alert('Hubo un error al actualizar el perfil');
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
              <Col md={6}>
                <Form.Group controlId="celular">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="tel"
                    name="celular"
                    value={userData.celular}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="fecha_nacimiento">
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
            <Row>
              <Col md={6}>
                <Form.Group controlId="estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    type="text"
                    name="estado"
                    value={userData.estado}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="municipio">
                  <Form.Label>Municipio</Form.Label>
                  <Form.Control
                    type="text"
                    name="municipio"
                    value={userData.municipio}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="imagenPerfil">
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
