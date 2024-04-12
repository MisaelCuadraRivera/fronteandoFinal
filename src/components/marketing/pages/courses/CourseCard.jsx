// import node module libraries
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	Image,
	Card,
	Row,
	Col,
	ProgressBar,
	ListGroup,
	Badge
} from 'react-bootstrap';

// import custom components
import Ratings from 'components/marketing/common/ratings/Ratings';
import LevelIcon from 'components/marketing/common/miscellaneous/LevelIcon';
import GKTippy from 'components/elements/tooltips/GKTippy';

// import utility file
import { numberWithCommas } from 'helper/utils';

const CourseCard = ({ course, viewby = 'default-value', extraclass }) => {

    if (!course) return null;

    const GridView = () => (
            <Card md={3} key={course.id} className={`mb-4 card-hover ${extraclass}`}>
              <Link to={`/marketing/courses/course-single/${course.id}`}>
                <Image src={course.image} alt="" className="card-img-top rounded-top-md" />
              </Link>
              <Card.Body>
                <h3 className="h4 mb-2 text-truncate-line-2">
                  <Link to={`/marketing/courses/course-single/${course.id}`}>
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
                <div className={`lh-1 mt-3 `}>
            <span className="text-dark">{course.category}</span>
          </div>
              </Card.Body>
              {/* Card Footer */}
              <Card.Footer>
                <Row className="align-items-center g-0">
                  <Col xs="auto">
                  <Image src={`data:image/jpeg;base64,${course.instructor_image}`} className="rounded-circle avatar-xs" alt={course.instructor_name} />
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

    const ListView = () => (
        <Card md={3} key={course.id} className={`mb-4 card-hover ${extraclass}`}>
        <Link to={`/marketing/courses/course-single/${course.id}`}>
          <Image src={course.image} alt="" className="card-img-top rounded-top-md" />
        </Link>
        <Card.Body>
          <h3 className="h4 mb-2 text-truncate-line-2">
            <Link to={`/marketing/courses/course-single/${course.id}`}>
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
          <div className={`lh-1 mt-3 `}>
            <span className="text-dark">{course.descripcion}</span>
          </div>
        </Card.Body>
        {/* Card Footer */}
        <Card.Footer>
          <Row className="align-items-center g-0">
            <Col xs="auto">
            <Image src={`data:image/jpeg;base64,${course.instructor_image}`} className="rounded-circle avatar-xs" alt={course.instructor_name} />
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
    

    const ListGroupView = () => (
        <Card md={3} key={course.id} className={`mb-4 card-hover ${extraclass}`}>
        <Link to={`/marketing/courses/course-single/${course.id}`}>
          <Image src={course.image} alt="" className="card-img-top rounded-top-md" />
        </Link>
        <Card.Body>
          <h3 className="h4 mb-2 text-truncate-line-2">
            <Link to={`/marketing/courses/course-single/${course.id}`}>
              {course.title}
            </Link>
          </h3>
          <h3 className="h4 mb-2 text-truncate-line-2">
          <Link to={`/marketing/courses/course-single/${course.id}`}>
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
          <div className={`lh-1 mt-3 `}>
            <span className="text-dark ">{course.category}</span>
          </div>
        </Card.Body>
        {/* Card Footer */}
        <Card.Footer>
          <Row className="align-items-center g-0">
            <Col xs="auto">
            <Image src={`data:image/jpeg;base64,${course.instructor_image}`} className="rounded-circle avatar-xs" alt={course.instructor_name} />
            </Col>
            <Col className="col ms-2">
              <span>{course.instructor_name}</span>
            </Col>
            
          </Row>
        </Card.Footer>
      </Card>
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
	item: PropTypes.object.isRequired,
	free: PropTypes.bool,
	viewby: PropTypes.string,
	showprogressbar: PropTypes.bool,
	extraclass: PropTypes.string,
	link: PropTypes.string
};

export default CourseCard;
