// import node module libraries
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
	Dropdown,
	Image,
	OverlayTrigger,
	Tooltip
} from 'react-bootstrap';
import { MoreVertical, Trash, Edit, Mail } from 'react-feather';

// import MDI icons
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';

// import custom components
import TanstackTable from 'components/elements/advance-table/TanstackTable';

// import utility file
import { numberWithCommas } from 'helper/utils';

// import data files
import { InstructorData } from 'data/users/InstructorData';

const InstructorsListItems = () => {
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
				<Dropdown.Menu align="end">
					<Dropdown.Header>Configuracion</Dropdown.Header>
					<Dropdown.Item eventKey="1">
						{' '}
						<Edit size="15px" className="dropdown-item-icon" /> Editar
					</Dropdown.Item>
					<Dropdown.Item eventKey="2">
						{' '}
						<Trash size="15px" className="dropdown-item-icon" /> Eliminar
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};

	const columns = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Nombre',
				cell: ({ getValue, row }) => {
					return (
						<div className="d-flex align-items-center">
							<Image
								src={row.original.image}
								alt=""
								className="rounded-circle avatar-md me-2"
							/>
							<h5 className="mb-0">{getValue()}</h5>
						</div>
					);
				}
			},
			{ accessorKey: 'topic', header: 'Especialidad' },
			{ accessorKey: 'courses', header: 'No. Cursos' },
			{ accessorKey: 'joined', header: 'Registro de alta' },
			{
				accessorKey: 'students',
				header: 'Estudiantes',
				cell: ({ getValue }) => {
					return numberWithCommas(getValue());
				}
			},
			{
				accessorKey: 'rating',
				header: 'Puntuacion',
				cell: ({ getValue }) => {
					return (
						<div className="align-middle text-warning border-top-0">
							{getValue()} <Icon path={mdiStar} size={0.6} />
						</div>
					);
				}
			},
			{
				accessorKey: 'delete',
				header: '',
				cell: () => {
					return (
						<div className="align-middle border-top-0">
							<OverlayTrigger
								key="top"
								placement="top"
								overlay={<Tooltip id={`tooltip-top`}>Eliminar</Tooltip>}
							>
								<Link href="#">
									<Trash size="15px" className="dropdown-item-icon" />
								</Link>
							</OverlayTrigger>
						</div>
					);
				}
			},
			{
				accessorKey: 'shortcutmenu',
				header: '',
				cell: () => {
					return <ActionMenu />;
				}
			}
		],
		[]
	);

	const data = useMemo(() => InstructorData, []);

	return (
		<TanstackTable
			data={data}
			columns={columns}
			filter={true}
			filterPlaceholder="Buscar instructores"
			pagination={true} />
	);
};

export default InstructorsListItems;
