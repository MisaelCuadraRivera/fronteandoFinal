import { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image, Card, Row, Col, ListGroup } from "react-bootstrap";
import LevelIcon from "components/marketing/common/miscellaneous/LevelIcon";
import GKTippy from "components/elements/tooltips/GKTippy";

// Placeholder image para cuando no haya imagen disponible
const defaultImage = '/path-to-placeholder-image.jpg';

const getImageSrc = (image) => {
  try {
    // Validar que image esté definido y contenga datos
    if (image && image.data) {
      // Verificar si la imagen ya está en formato base64
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

const CourseCard = ({ course, viewby = 'grid', extraclass }) => {
  if (!course) return null;

  // Filtrar solo los cursos aprobados
  if (course.status?.toLowerCase() !== "aprobado") {
    return null; // No renderizar si el curso no está aprobado
  }

  const GridView = () => (
    <Card md={3} key={course.id} className={`mb-4 card-hover ${extraclass}`}>
      <Link to={`/marketing/courses/course-single/${course.id}`}>
        <Image
          src={getImageSrc(course.image)}
          alt={course.title || 'Course Image'}
          className="card-img-top rounded-top-md"
        />
      </Link>
      <Card.Body>
        <h3 className="h4 mb-2 text-truncate-line-2">
          <Link to={`/marketing/courses/course-single/${course.id}`}>
            {course.title}
          </Link>
        </h3>
        <h3 className="h4 mb-2 text-truncate-line-2">
          <Link to={`/courses/${course.id}`} className="text-inherit">
            {course.description}
          </Link>
        </h3>
        <ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
          <ListGroup.Item as="li" bsPrefix="list-inline-item">
            <LevelIcon level={course.level} />
            {course.level}
          </ListGroup.Item>
        </ListGroup>
        <div className="lh-1 mt-3">
          <span className="text-dark fw-bold">{course.precio}</span>
        </div>
        <div className="lh-1 mt-3">
          <span className="text-dark">{course.category}</span>
        </div>
      </Card.Body>
      <Card.Footer>
        <Row className="align-items-center g-0">
          <Col xs="auto">
            <Image
              src={getImageSrc(course.instructor_image)}
              className="rounded-circle avatar-xs"
              alt={course.instructor_name || 'Instructor'}
            />
          </Col>
          <Col className="col ms-2">
            <span>{course.instructor_name}</span>
          </Col>
          <Col xs="auto">
            <GKTippy content="Add to Bookmarks">
              <Link to="#">
                <i className="fe fe-bookmark"></i>
              </Link>
            </GKTippy>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );

  return <Fragment>{viewby === 'grid' && <GridView />}</Fragment>;
};

// Default Props
CourseCard.defaultProps = {
  viewby: "grid",
  extraclass: "",
};

// Prop Types
CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  viewby: PropTypes.string,
  extraclass: PropTypes.string,
};

export default CourseCard;
