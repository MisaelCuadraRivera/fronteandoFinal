// import node module libraries
import React from 'react';
import { Col, Row, Card, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import custom components
import { FlatPickr } from 'components/elements/flat-pickr/FlatPickr';
import ApexCharts from 'components/elements/charts/ApexCharts';
import StatRightIcon from 'components/dashboard/common/stats/StatRightIcon';

// import sub components
import PopularInstructor from './PopularInstructor';
import RecentCourses from './RecentCourses';
import Activity from './Activity';

// import data files
import {
	TrafficChartSeries,
	TrafficChartOptions,
	EarningsChartSeries,
	EarningsChartOptions
} from 'data/charts/ChartData';

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
						value="$10,800"
						summary="Numero de ventas"
						summaryValue="+20.9$"
						summaryIcon="up"
						showSummaryIcon
						iconName="shopping-bag"
						iconColorVariant="primary"
						classValue="mb-4"
					/>
				</Col>

				<Col xl={3} lg={6} md={12} sm={12}>
					<StatRightIcon
						title="Cursos"
						value="15"
						summary="Pendientes de aprobar"
						summaryValue="120+"
						summaryIcon="down"
						iconName="book-open"
						iconColorVariant="primary"
						classValue="mb-4"
					/>
				</Col>

				<Col xl={3} lg={6} md={12} sm={12}>
					<StatRightIcon
						title="Estudiantes"
						value="1,400"
						summary="Estudiantes"
						summaryValue="+1200"
						summaryIcon="up"
						showSummaryIcon
						iconName="users"
						iconColorVariant="primary"
						classValue="mb-4"
					/>
				</Col>

				<Col xl={3} lg={6} md={12} sm={12}>
					<StatRightIcon
						title="Instructores"
						value="78"
						summary="Instructores"
						summaryValue="+20"
						summaryIcon="up"
						showSummaryIcon
						iconName="user-check"
						iconColorVariant="primary"
						classValue="mb-4"
					/>
				</Col>
			</Row>

			<Row>
				<Col xl={4} lg={6} md={12} className="mb-4">
					<PopularInstructor title="Instructores regustrados" />
				</Col>
				<Col xl={4} lg={6} md={12} className="mb-4">
					<RecentCourses title="Cursos creados" />
				</Col>
			</Row>
		</div>
	);
};

export default Overview;
