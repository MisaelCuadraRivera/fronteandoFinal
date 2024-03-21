// import node module libraries
import React, { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash, Send, Inbox, MoreVertical } from 'react-feather';
import {
	Col,
	Row,
	Dropdown,
	Card,
	Breadcrumb,
	Button,
	Modal,
	Badge
} from 'react-bootstrap';

// import custom components
import Checkbox from 'components/elements/advance-table/Checkbox';
import TanstackTable from 'components/elements/advance-table/TanstackTable';

// import sub components
import AddNewCategoryPopup from './AddNewCategoryPopup';

// import data files
import { courses } from 'data/courses/CoursesCategoryData';

const CoursesCategory = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
				<Dropdown.Menu align="end">
					<Dropdown.Header>Acciones</Dropdown.Header>
					<Dropdown.Item eventKey="1">
						<Send size={14} className="dropdown-item-icon me-2" /> Publicar
					</Dropdown.Item>
					<Dropdown.Item eventKey="2">
						<Inbox size={14} className="dropdown-item-icon me-2" /> Archivar
					</Dropdown.Item>
					<Dropdown.Item eventKey="3">
						<Trash size={14} className="dropdown-item-icon me-2" /> Eliminar
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

			{ accessorKey: 'category', header: 'Categoria' },
			{ accessorKey: 'slug', header: 'identificador' },
			{ accessorKey: 'posts', header: 'Cursos' },
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
							<h1 className="mb-1 h2 fw-bold">Categoria de cursos</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item href="#">Cursos</Breadcrumb.Item>
								<Breadcrumb.Item active>Categoria de Cursos</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<Button variant="primary" onClick={handleShow}>
								Agregar nueva categoria
							</Button>
							<Modal show={show} onHide={handleClose} size="lg">
								<Modal.Header closeButton>
									<Modal.Title>Crear nuevo cursos</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<AddNewCategoryPopup />
								</Modal.Body>
								<Modal.Footer className="d-flex justify-content-start border-0 pt-0">
									{/*  Action Buttons  */}
									<Button variant="primary" onClick={handleClose}>
										Agregar nueva categoria
									</Button>
									<Button variant="outline-secondary" onClick={handleClose}>
										Cerrar
									</Button>
								</Modal.Footer>
							</Modal>
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
								filterPlaceholder="Buscar categoria"
								pagination={true} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default CoursesCategory;