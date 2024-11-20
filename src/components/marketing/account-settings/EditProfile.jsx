import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Button, Image, InputGroup, FormControl } from 'react-bootstrap';
import ProfileLayout from 'components/marketing/instructor/ProfileLayout'; // Asegúrate de ajustar la importación según tu estructura de archivos
import Avatar3 from 'assets/images/avatar/emblema2.png'; 

const EditProfile = () => {
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
      fecha_nacimiento: userData.fecha_nacimiento,
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
      console.log('Perfil actualizado:', userProfileData);
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
