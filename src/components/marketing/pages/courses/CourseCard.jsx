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

const CourseCard = ({
	item,
	free,
	viewby,
	showprogressbar,
	extraclass,
	link
}) => {
	/** Used in Course Index, Course Category, Course Filter Page, Student Dashboard etc...  */
	const GridView = () => {
		return (
			<Card className={`mb-4 card-hover ${extraclass}`}>
				<Link to={link}>
					<Image
						src={item.image}
						alt=""
						className="card-img-top rounded-top-md"
					/>
				</Link>
				{/* Card body  */}
				<Card.Body>
					<h3 className="h4 mb-2 text-truncate-line-2 ">
						<Link to={link} className="text-inherit">
							{item.title}
						</Link>
					</h3>
					<ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
						<ListGroup.Item as="li" bsPrefix="list-inline-item">
							<LevelIcon level={item.level} />
							{item.level}
						</ListGroup.Item>
					</ListGroup>
					<div
						className={`lh-1 d-flex align-items-center ${free ||
								item.price === undefined ||
								item.price <= 0 ||
								item.discount === undefined
								? 'mb-5'
								: ''
							}`}
					>
					</div>
					<div
						className={`lh-1 mt-3 `}
					>
						<span className="text-dark fw-bold">
							${item.price}
						</span>{' '}
					</div>
				</Card.Body>
				{/* Card Footer */}
				<Card.Footer>
					<Row className="align-items-center g-0">
						<Col xs="auto">
							<Image
								src={item.instructor_image}
								className="rounded-circle avatar-xs"
								alt=""
							/>
						</Col>
						<Col className="col ms-2">
							<span>{item.instructor_name}</span>
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
	};

	/** Used in Course Filter Page  */
	const ListView = () => {
		return (
			<Card className={`mb-4 card-hover ${extraclass}`}>
				<Link to={link}>
					<Image
						src={item.image}
						alt=""
						className="card-img-top rounded-top-md"
					/>
				</Link>
				{/* Card body  */}
				<Card.Body>
					<h3 className="h4 mb-2 text-truncate-line-2 ">
						<Link to={link} className="text-inherit">
							{item.title}
						</Link>
					</h3>
					<ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
						<ListGroup.Item as="li" bsPrefix="list-inline-item">
							<LevelIcon level={item.level} />
							{item.level}
						</ListGroup.Item>
					</ListGroup>
					<div
						className={`lh-1 d-flex align-items-center ${free ||
								item.price === undefined ||
								item.price <= 0 ||
								item.discount === undefined
								? 'mb-5'
								: ''
							}`}
					>
					</div>
					<div
						className={`lh-1 mt-3 `}
					>
						<span className="text-dark fw-bold">
							${item.price}
						</span>{' '}
					</div>
				</Card.Body>
				{/* Card Footer */}
				<Card.Footer>
					<Row className="align-items-center g-0">
						<Col xs="auto">
							<Image
								src={item.instructor_image}
								className="rounded-circle avatar-xs"
								alt=""
							/>
						</Col>
						<Col className="col ms-2">
							<span>{item.instructor_name}</span>
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
	};

	/** Used in Instructor Profile Page  */
	const ListGroupView = () => {
		return (
			<Card className={`mb-4 card-hover ${extraclass}`}>
				<Link to={link}>
					<Image
						src={item.image}
						alt=""
						className="card-img-top rounded-top-md"
					/>
				</Link>
				{/* Card body  */}
				<Card.Body>
					<h3 className="h4 mb-2 text-truncate-line-2 ">
						<Link to={link} className="text-inherit">
							{item.title}
						</Link>
					</h3>
					<ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
						<ListGroup.Item as="li" bsPrefix="list-inline-item">
							<LevelIcon level={item.level} />
							{item.level}
						</ListGroup.Item>
					</ListGroup>
					<div
						className={`lh-1 d-flex align-items-center ${free ||
								item.price === undefined ||
								item.price <= 0 ||
								item.discount === undefined
								? 'mb-5'
								: ''
							}`}
					>
					</div>
					<div
						className={`lh-1 mt-3 `}
					>
						<span className="text-dark fw-bold">
							${item.price}
						</span>{' '}
					</div>
				</Card.Body>
				{/* Card Footer */}
				<Card.Footer>
					<Row className="align-items-center g-0">
						<Col xs="auto">
							<Image
								src={item.instructor_image}
								className="rounded-circle avatar-xs"
								alt=""
							/>
						</Col>
						<Col className="col ms-2">
							<span>{item.instructor_name}</span>
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
	};
	return (
		<Fragment>
			{viewby === 'grid' ? (
				<GridView />
			) : viewby === 'list' ? (
				<ListView />
			) : (
				<ListGroupView />
			)}
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
