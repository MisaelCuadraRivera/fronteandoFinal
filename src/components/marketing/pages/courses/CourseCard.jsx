import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Image,
    Card,
    Row,
    Col,
    ListGroup
} from 'react-bootstrap';

// Asumiendo que estos componentes ya manejan props dinámicas correctamente
import Ratings from 'components/marketing/common/ratings/Ratings';
import LevelIcon from 'components/marketing/common/miscellaneous/LevelIcon';
import GKTippy from 'components/elements/tooltips/GKTippy';

// Utility function
import { numberWithCommas } from 'helper/utils';

const CourseCard = ({ free, viewby, showprogressbar, extraclass, link }) => {
    // Se asume que los datos de los cursos se obtienen desde una API
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Cambia la URL por la dirección correcta de tu API
        axios.get('http://localhost:3001/api/cursos')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error("Error al cargar los cursos", error);
            });
    }, []);

    const GridView = () => (
        <Fragment>
            {courses.map(course => (
                <Card key={course.id} className={`mb-4 card-hover ${extraclass}`}>
                    <Link to={`/courses/${course.id}`}>
                        <Image src={course.image} alt="" className="card-img-top rounded-top-md" />
                    </Link>
                    <Card.Body>
                        <h3 className="h4 mb-2 text-truncate-line-2">
                            <Link to={`/courses/${course.id}`} className="text-inherit">
                                {course.title}
                            </Link>
                        </h3>
						<h3 className="h4 mb-2 text-truncate-line-2">
                            <Link to={`/courses/${course.id}`} className="text-inherit">
                                {course.descripcion}
                            </Link>
                        </h3>
                        <ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
                            <ListGroup.Item as="li" bsPrefix="list-inline-item">
                                <LevelIcon level={course.level} />
                                {course.level}
                            </ListGroup.Item>
                        </ListGroup>
                        <div className={`lh-1 mt-3 `}>
                            <span className="text-dark fw-bold">{course.precio}</span>
                        </div>
                    </Card.Body>
                    {/* Card Footer */}
                    <Card.Footer>
                        <Row className="align-items-center g-0">
                            <Col xs="auto">
                                <Image src={course.instructor_image} className="rounded-circle avatar-xs" alt="" />
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
            ))}
        </Fragment>
    );

    const ListView = () => (
        // Repetimos la lógica para ListView adaptándola según sea necesario
        // Para este ejemplo, mantendremos la misma estructura que GridView
        <GridView />
    );

    const ListGroupView = () => (
        // Repetimos la lógica para ListGroupView adaptándola según sea necesario
        // Para este ejemplo, mantendremos la misma estructura que GridView
        <GridView />
    );

    return (
        <Fragment>
            {viewby === 'grid' && <GridView />}
            {viewby === 'list' && <ListView />}
            {viewby === 'listGroup' && <ListGroupView />}
        </Fragment>
    );
};

// Specifies the default values for props
CourseCard.defaultProps = {
    free: false,
    viewby: 'grid',
    showprogressbar: false,
    extraclass: '',
    link: '#'
};

// Typechecking With PropTypes
CourseCard.propTypes = {
    free: PropTypes.bool,
    viewby: PropTypes.string,
    showprogressbar: PropTypes.bool,
    extraclass: PropTypes.string,
    link: PropTypes.string
};

export default CourseCard;
