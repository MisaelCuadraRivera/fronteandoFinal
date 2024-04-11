// import node module libraries
import React, { useMemo } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import required custom components
import TanstackTable from 'components/elements/advance-table/TanstackTable';

// import data files
import { StudentsList } from 'data/users/StudentsData';

const StudentsListCard = () => {
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
			{ accessorKey: 'joined', header: 'Inscrito' },
			{
				accessorKey: 'progress',
				header: 'Progreso',
				cell: ({ getValue }) => {
					return getValue() + '%';
				}
			},
			
			{
				accessorKey: 'Locations',
				header: 'Dirección',
				cell: ({ getValue }) => {
					return (
						<span className="fs-6">
							<i className="fe fe-map-pin me-1"></i>
							{getValue()}
						</span>
					);
				}
			},
		],
		[]
	);

	const data = useMemo(() => StudentsList, []);

	return (
		<TanstackTable
			data={data}
			columns={columns}
			filter={true}
			filterPlaceholder="Buscar por nombre"
			pagination={true}
			exportButton={true} />
	);
};

export default StudentsListCard;
