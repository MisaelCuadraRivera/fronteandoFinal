import React, { Fragment, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
    Col,
    Row,
    Container,
    Nav,
    Card,
    Tab,
    Image
} from 'react-bootstrap';

import Ratings from 'components/marketing/common/ratings/Ratings';
import GKTippy from 'components/elements/tooltips/GKTippy';
import CheckedMark from 'assets/images/svg/checked-mark.svg';

const CourseSingle = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3001/courses/${courseId}`);
                setCourse(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos del curso:', error);
                setError('No se pudo cargar el curso. Intente de nuevo más tarde.');
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleEnroll = async () => {
        try {
            const response = await axios.post('http://localhost:3001/enroll', {
                cursoId: courseId
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
				
            });
            alert('Inscripción realizada con éxito!');
        } catch (error) {
            console.error('Error durante la inscripción:', error.response.data);
            alert(error.response.data);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!course) return <div>No se encontró el curso</div>;
	


	return (
		<Fragment>
			{/* Page header */}
			<section className="pt-lg-8 pb-lg-16 pt-8 pb-12" style={{backgroundColor:"#009475"}}>
				<Container>
					<Row className="align-items-center">
						<Col xl={7} lg={7} md={12} sm={12}>
							<div>
							<h1 className="text-white display-4 fw-semi-bold">{course.title}</h1>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			{/* Page content */}
			<section className="pb-10">
				<Container>
					<Row>
						<Col lg={8} md={12} sm={12} className="mt-n8 mb-4 mb-lg-0">
							<Tab.Container defaultActiveKey="descripción">
								<Card>
									<Nav className="nav-lb-tab">
										{[
											'Descripción',
										].map((item, index) => (
											<Nav.Item key={index}>
												<Nav.Link
													href={`#${item.toLowerCase()}`}
													eventKey={item.toLowerCase()}
													className="mb-sm-3 mb-md-0"
												>
													{item}
												</Nav.Link>
											</Nav.Item>
										))}
									</Nav>
									<Card.Body className="p-0">
										<Tab.Content>
											<Tab.Pane eventKey="descripción" className="pb-4 p-4">
												{/* Description */}
												{course.description}
											</Tab.Pane>
											<Tab.Pane eventKey="reseñas" className="pb-4 p-4">
												{/* Reviews */}
											</Tab.Pane>
											
										</Tab.Content>
									</Card.Body>
								</Card>
							</Tab.Container>
						</Col>
						<Col lg={4} md={12} sm={12} className="mt-lg-n22">
							{/* Card */}
							<Card className="mb-3 mb-4">
								<div className="p-1">
									<div
										className="d-flex justify-content-center position-relative rounded py-10 border-white border rounded-3 bg-cover"
										style={{backgroundImage: `url(${course.image})`}}>
									</div>
								</div>


								{/* Card body */}
								<Card.Body>
									{/* Price single page */}
									<div className="mb-3">
									<span className="text-dark fw-bold h2 me-2">${course.precio}</span>
									</div>
                                    <div className="d-grid">
                                        <button onClick={handleEnroll} className="btn" style={{ backgroundColor: "#042b61", color: "white" }}>Inscribirme</button>
                                    </div>
								</Card.Body>
							</Card>
							{/* Card */}
							
							{/* Card */}
							<Card>
								{/* Card body */}
								<Card.Body>
									<div className="d-flex align-items-center">
										<div className="position-relative">
										<Image src={`data:image/jpeg;base64,${course.instructor_image}`} alt={course.instructor_name} className="rounded-circle avatar-xl" />
											<Link
												to="#"
												className="position-absolute mt-2 ms-n3"
												data-bs-toggle="tooltip"
												data-placement="top"
												title="Verifed"
											>
												<Image
													src={CheckedMark}
													alt=""
													height="30"
													width="30"
												/>
											</Link>
										</div>
										<div className="ms-4">
										<h4 className="mb-0">{course.instructor_name}</h4>
										<p className="mb-1 fs-6">{course.category}</p>
										</div>
									</div>
									<Row className="border-top mt-3 border-bottom mb-3 g-0">
										<Col className="border-start">
											<div className="pe-1 ps-3 py-3">
												<h5 className="mb-0">{course.status}</h5>
												<span>Status</span>
											</div>
										</Col>
										<Col className="border-start">
											<div className="pe-1 ps-3 py-3">
												<h5 className="mb-0">{course.applicant_requirements}</h5>
												<span>Requistos</span>
											</div>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>
		</Fragment>
	);
};

export default CourseSingle;
