// import node module libraries
import React, { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Dropdown, Breadcrumb, Card, Badge } from 'react-bootstrap';
import { Trash, Send, Inbox, MoreVertical } from 'react-feather';

// import custom components
import Checkbox from 'components/elements/advance-table/Checkbox';
import TanstackTable from 'components/elements/advance-table/TanstackTable';

// import data files
import { courses } from 'data/courses/CoursesCategoryData';

const Category = () => {
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
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle}>
					<MoreVertical size="15px" className="text-secondary" />
				</Dropdown.Toggle>
				<Dropdown.Menu align={'end'}>
					<Dropdown.Header>ACTION</Dropdown.Header>
					<Dropdown.Item eventKey="1">
						<Send size="15px" className="dropdown-item-icon" /> Publicar
					</Dropdown.Item>
					<Dropdown.Item eventKey="2">
						<Inbox size="15px" className="dropdown-item-icon" /> Archivado
					</Dropdown.Item>
					<Dropdown.Item eventKey="3">
						<Trash size="15px" className="dropdown-item-icon" /> Eliminar
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};
	const columns = useMemo(
		() => [
			{
				id: 'select',
				header: ({ table }) => (
					<Checkbox
						{...{
							checked: table.getIsAllRowsSelected(),
							indeterminate: table.getIsSomeRowsSelected(),
							onChange: table.getToggleAllRowsSelectedHandler(),
						}}
					/>
				),
				cell: ({ row }) => (
					<div className="px-1">
						<Checkbox
							{...{
								checked: row.getIsSelected(),
								disabled: !row.getCanSelect(),
								indeterminate: row.getIsSomeSelected(),
								onChange: row.getToggleSelectedHandler(),
							}}
						/>
					</div>
				),
			},
			{
				accessorKey: 'category',
				header: 'Categoria',
				cell: ({ getValue }) => {
					return (
						(<Link href="#" className="text-inherit position-relative">
							<h5 className="mb-0 text-primary-hover">{getValue()}</h5>
						</Link>)
					);
				}
			},
			{ accessorKey: 'slug', header: 'Identificador' },
			{ accessorKey: 'posts', header: 'Cursos con esa categoria' },
			{ accessorKey: 'date_created', header: 'Fecha de creacion' },
			{ accessorKey: 'date_updated', header: 'Fecha de actualizacion' },
			{
				accessorKey: 'status',
				header: 'Status',
				cell: ({ getValue }) => {
					return (<Badge bg={getValue() === 1 ? 'success' : getValue() === 0 ? 'warning' : ''}>{getValue() === 1 ? 'Live' : getValue() === 0 ? 'Draft' : ''}</Badge>);
				}
			},
			{
				accessorKey: 'action',
				header: '',
				cell: () => {
					return <ActionMenu />;
				}
			}
		],
		[]
	);

	const data = useMemo(() => courses, []);

	return (
		<Fragment>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-1 h2 fw-bold">Tipos de evento</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item href="#">Gestion de eventos</Breadcrumb.Item>
								<Breadcrumb.Item active>Tipos de evento</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<Link to="/cms/all-posts" className="btn btn-outline-secondary ">
								Regresar a listado de eventos
							</Link>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<Card>
						<Card.Body className="p-0">
							<TanstackTable
								data={data}
								columns={columns}
								filter={true}
								filterPlaceholder="Buscar eventos"
								pagination={true} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default Category;
