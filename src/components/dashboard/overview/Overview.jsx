// import node module libraries
import { Col, Row, Card, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StatRightIcon from 'components/dashboard/common/stats/StatRightIcon';

// import sub components
import PopularInstructor from './PopularInstructor';
import RecentCourses from './RecentCourses';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	<Link
		to=""
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}
		className="btn-icon btn btn-ghost btn-sm rounded-circle"
	>
		{children}
	</Link>
));

const ChartActionMenu = () => {
	return (
		<div>
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle}>
					<i className="fe fe-more-vertical text-muted"></i>
				</Dropdown.Toggle>
				<Dropdown.Menu align="end">
					<Dropdown.Header>Opciones</Dropdown.Header>
					<Dropdown.Item eventKey="1">
						<i className="fe fe-external-link dropdown-item-icon "></i> Exportar
					</Dropdown.Item>
					<Dropdown.Item eventKey="2">
						<i className="fe fe-mail dropdown-item-icon "></i> Reporte
					</Dropdown.Item>
					<Dropdown.Item eventKey="3">
						<i className="fe fe-download dropdown-item-icon "></i> Descargar
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

const Overview = () => {
	const [ventas, setVentas] = useState('Cargando...');
    const [totalCursos, setTotalCursos] = useState('Cargando...');
    const [totalEstudiantes, setTotalEstudiantes] = useState('Cargando...');
    const [totalInstructores, setTotalInstructores] = useState('Cargando...');

	// Función para cargar los datos
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Ventas
                const responseVentas = await axios.get('http://localhost:3001/total-sales');
                setVentas(`$${responseVentas.data.totalVentas}`);

                // Cursos
                const responseCursos = await axios.get('http://localhost:3001/total-courses');
                setTotalCursos(responseCursos.data.totalCursos);

                // Comunidad (Estudiantes e Instructores)
                const responseComunidad = await axios.get('http://localhost:3001/community-count');
                let estudiantes = 0;
                let instructores = 0;
                responseComunidad.data.forEach(item => {
                    if (['estudiante', 'egresado', 'publico'].includes(item.utez_community)) {
                        estudiantes += item.count;
                    } else if (item.utez_community === 'profesor') {
                        instructores += item.count;
                    }
                });
                setTotalEstudiantes(estudiantes);
                setTotalInstructores(instructores);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                // Manejo simple del error, puedes personalizarlo
                setVentas('Error al cargar');
                setTotalCursos('Error al cargar');
                setTotalEstudiantes('Error al cargar');
                setTotalInstructores('Error al cargar');
            }
        };

        fetchData();
    }, []);


	return (
		<div>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-lg-flex justify-content-between align-items-center">
						<div className="mb-3 mb-lg-0">
							<h1 className="mb-0 h2 fw-bold">Panel de administrador</h1>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
                <Col xl={3} lg={6} md={12} sm={12}>
                    <StatRightIcon
                        title="Ventas"
                        value={ventas}
                        showSummaryIcon
                        iconName="shopping-bag"
                        iconColorVariant="success"
                        classValue="mb-4"
                    />
                </Col>

                <Col xl={3} lg={6} md={12} sm={12}>
                    <StatRightIcon
                        title="Cursos"
                        value={totalCursos.toString()}
                        iconName="book-open"
                        iconColorVariant="success"
                        classValue="mb-4"
                    />
                </Col>

                <Col xl={3} lg={6} md={12} sm={12}>
                    <StatRightIcon
                        title="Estudiantes"
                        value={totalEstudiantes.toString()}
                        showSummaryIcon
                        iconName="users"
                        iconColorVariant="success"
                        classValue="mb-4"
                    />
                </Col>

                <Col xl={3} lg={6} md={12} sm={12}>
                    <StatRightIcon
                        title="Instructores"
                        value={totalInstructores.toString()}
                        showSummaryIcon
                        iconName="user-check"
                        iconColorVariant="success"
                        classValue="mb-4"
                    />
                </Col>
            </Row>

			<Row>
				<Col xl={4} lg={6} md={12} className="mb-4">
					<PopularInstructor title="Instructores registrados" />
				</Col>
				<Col xl={4} lg={6} md={12} className="mb-4">
					<RecentCourses title="Cursos creados recientemente" />
				</Col>
			</Row>
		</div>
	);
};

export default Overview;
