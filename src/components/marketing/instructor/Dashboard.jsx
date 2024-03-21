// import node module libraries
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Table, Dropdown, Image } from 'react-bootstrap';

// import custom components
import StatRightBadge from 'components/marketing/common/stats/StatRightBadge';


// import data files
import BestSellingCoursesData from 'data/marketing/BestSellingCoursesData';


// import profile layout wrapper
import ProfileLayout from './ProfileLayout';

const Dashboard = () => {
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

	const ActionMenu = () => {
		return (
			<div>
				<Dropdown>
					<Dropdown.Toggle as={CustomToggle}>
						<i className="fe fe-more-vertical text-muted"></i>
					</Dropdown.Toggle>
					<Dropdown.Menu align="end">
						<Dropdown.Item eventKey="1">
							<i className="fe fe-edit dropdown-item-icon"></i> Editar
						</Dropdown.Item>
						<Dropdown.Item eventKey="2">
							<i className="fe fe-trash dropdown-item-icon"></i> Remover
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	};

	return (
		<ProfileLayout>
			{/* Page Content section */}
			<Row>
				<Col lg={6} md={12} sm={12} className="mb-4 mb-lg-0">
					<StatRightBadge
						title="Estudiantes"
						subtitle="Este mes"
						value="12,000"
						badgeValue="120+"
						colorVariant="info"
					/>
				</Col>
				<Col lg={6} md={12} sm={12} className="mb-4 mb-lg-0">
					<StatRightBadge
						title="Calificación de cursos"
						subtitle="Calificación promedio"
						value="4.80"
						badgeValue="10+"
						colorVariant="warning"
					/>
				</Col>
			</Row>
			{/* <!-- Card --> */}

			<Card className="mt-4">
				<Card.Header>
					<h3 className="mb-0 h4">Cursos mas vendidos</h3>
				</Card.Header>
				<Card.Body className="p-0 ">
					<Table hover responsive className="mb-0 text-nowrap table-centered">
						<thead className="table-light">
							<tr>
								<th scope="col" className="border-0">
									CURSOS
								</th>
								<th scope="col" className="border-0">
									VENTAS
								</th>
								<th scope="col" className="border-0">
									MONTO
								</th>
								<th scope="col" className="border-0"></th>
							</tr>
						</thead>
						<tbody>
							{BestSellingCoursesData.map((item, index) => {
								return (
									<tr key={index}>
										<td className="align-middle border-top-0 ">
											<Link to="#">
												<div className="d-lg-flex align-items-center">
													<Image
														src={item.image}
														alt=""
														className="rounded img-4by3-lg"
													/>
													<h5 className="mb-0 ms-lg-3 mt-lg-0 mt-2 text-primary-hover">
														{item.title}
													</h5>
												</div>
											</Link>
										</td>
										<td className="align-middle border-top-0">{item.sales}</td>
										<td className="align-middle border-top-0">
											${item.amount}{' '}
										</td>
										<td className="align-middle border-top-0">
											<ActionMenu />
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
			{/* end of Page Content section*/}
		</ProfileLayout>
	);
};
export default Dashboard;
