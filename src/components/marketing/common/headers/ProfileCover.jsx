import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Importa componentes personalizados
import LevelIconWithTooltip from 'components/marketing/common/miscellaneous/LevelIconWithTooltip';

// Importa archivos de medios
import CheckedMark from 'assets/images/svg/checked-mark.svg';
import ProfileBackground from 'assets/images/background/profile-bg.jpg';

// Imagen predeterminada si no hay imagen disponible
const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png';

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
    console.error('Error procesando la imagen:', error);
  }
  return defaultAvatar;
};

const ProfileCover = ({ dashboardData }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Obtener datos del usuario desde el backend
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener los datos del perfil');
        }
        const data = await response.json();
        setUserProfile(data);
		console.log(data);
		console.log('User',userProfile);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return <p>Cargando perfil...</p>;
  }

  // Determinar si mostrar los botones según el rol del usuario
  const showButtons =
    userProfile.utez_community === 'administrativo' ||
    userProfile.utez_community === 'profesor';

  return (
    <Row className="align-items-center">
      <Col xl={12} lg={12} md={12} sm={12}>
        <div
          className="pt-16 rounded-top-md"
          style={{
            background: `url(${ProfileBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          {' '}
        </div>
        <Card className="px-4 pt-2 pb-4 rounded-0 rounded-bottom shadow-sm">
          <div className="d-flex align-items-end justify-content-between">
            <div className="d-flex align-items-center">
              <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                <Image
                  src={getImageSrc(userProfile.imagen)} // Imagen procesada o predeterminada
                  className="avatar-xl rounded-circle border border-4 border-white position-relative"
                  alt="Avatar"
                />
                {userProfile.verified && (
                  <Link
                    to="#"
                    className="position-absolute top-0 end-0"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title="Verified"
                  >
                    <Image src={CheckedMark} alt="Verified" height="30" width="30" />
                  </Link>
                )}
              </div>
              <div className="lh-1">
                <h2 className="mb-0">
                  {userProfile.nombre} {userProfile.apellidos}{' '}
                  <LevelIconWithTooltip level={userProfile.level} />
                </h2>
                <p className="mb-0 d-block">{userProfile.email}</p>
              </div>
            </div>

            {/* Mostrar botones solo si el usuario tiene el rol adecuado */}
              <div className="d-flex">
                <Link to="/" className="btn btn-secondary me-2">
                  Principal
                </Link>
			{showButtons && (
                <Link
                  to="http://localhost:3000/marketing/instructor/add-new-course/"
                  className="btn btn-primary"
                >
                  Proponer curso
                </Link>
			)}
              </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileCover;
