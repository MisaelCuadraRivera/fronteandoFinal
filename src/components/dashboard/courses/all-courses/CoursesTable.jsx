import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Dropdown, Modal, Form } from 'react-bootstrap';
import { XCircle, MoreVertical } from 'react-feather';
import DotBadge from 'components/elements/bootstrap/DotBadge';
import TanstackTable from 'components/elements/advance-table/TanstackTable';
import axios from 'axios'; // Asegúrate de tener axios instalado

const CoursesTable = ({ courses_data }) => {

	const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCourseId, setCurrentCourseId] = useState(null);
    const [precio, setPrecio] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/courses');
                setCourses(response.data);
				console.log(response.data); // Añade esto para inspeccionar los datos
            } catch (error) {
                console.error('Error al cargar los cursos:', error);
            }
        };

        fetchCourses();
    }, []);

	 // Función para cambiar el estado del curso
	 const changeCourseStatus = async (courseId, newStatus) => {
        // Aquí se asume que tu backend está configurado para recibir el ID del curso y el nuevo estado
        // y actualizar el estado del curso en la base de datos.
        try {
            await axios.post('http://localhost:3001/update-course-status', {
                id: courseId,
                status: newStatus,
            });
            const updatedCourses = courses.map(course =>
                course.id === courseId ? { ...course, status: newStatus } : course
            );
            setCourses(updatedCourses);
        } catch (error) {
            console.error('Error al cambiar el estado del curso:', error);
        }
    };

    // Función para cambiar el estado del curso
    const handleApprove = (courseId) => {
        setShowModal(true);
        setCurrentCourseId(courseId);
    };

    const changeCourseStatusWithPrice = async () => {
        if (!precio) {
            alert("Por favor, introduce un precio para el curso.");
            return;
        }
        try {
            await axios.post('http://localhost:3001/update-course-status', {
                id: currentCourseId,
                status: 'aprobado',
                precio: precio,
            });
            // Actualiza el estado local para reflejar el cambio
			const updatedCourses = courses.map(course =>
				course.id === currentCourseId ? { ...course, status: 'aprobado', precio: precio } : course
			);
            setCourses(updatedCourses);
            // Restablece el modal
            setShowModal(false);
            setPrecio('');
            setCurrentCourseId(null);
        } catch (error) {
            console.error('Error al cambiar el estado del curso:', error);
        }
    };
	
	// The forwardRef is important!!
	// Dropdown needs access to the DOM node in order to position the Menu
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<Link
			to="#"
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
					<Dropdown.Header>Ajustes</Dropdown.Header>
					<Dropdown.Item eventKey="1">
						<XCircle size={14} className="me-1" /> Rechazar con comentarios
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};

    const columns = useMemo(() => [
		{
            header: 'Imagen',
            accessorKey: 'image',
            cell: info => <Image src={info.getValue()} alt="Imagen del curso" className="img-fluid rounded" style={{ width: '100px' }} />
        },
        {
            header: 'Curso',
            accessorKey: 'title', // Asegúrate de que 'title' coincide con la propiedad de tus datos
            cell: info => info.getValue(),
        },
        {
            header: 'Instructor',
            accessorKey: 'instructor_name', // Asume una propiedad 'instructor_name' en tus datos
            cell: info => info.getValue(),
        },
        {
            header: 'Estado',
            accessorKey: 'status',
            cell: ({ getValue }) => (
                <Fragment>
                    <DotBadge
                        bg={
                            getValue().toLowerCase() === 'pendiente'
                                ? 'warning'
                                : getValue().toLowerCase() === 'aprobado'
                                ? 'success'
                                : 'danger' // Asume 'rechazado' como rojo/danger
                        }
                    />
                    {getValue()}
                </Fragment>
            )
        },
		{
			header: 'Acciones',
			id: 'actions',
			cell: ({ row }) => (
				<Fragment>
					{row.original.status === 'Pendiente' && (
						<Fragment>
							<Button onClick={() => handleApprove(row.original.id)} variant="success" className="me-2 btn-sm">
								Aprobar
							</Button>

							<Button onClick={() => changeCourseStatus(row.original.id, 'rechazado')} variant="danger" className="btn-sm">
								Rechazar
							</Button>
						</Fragment>
					)}
				</Fragment>
			)
		}		
    ], [courses, changeCourseStatus]);

	const data = useMemo(() => courses, [courses]);


    return (
        <Fragment>
            <TanstackTable
                data={data}
                columns={columns}
                filter={true}
                filterPlaceholder="Buscar Cursos"
                pagination={true} />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Asignar precio al curso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Introduce el precio del curso"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={changeCourseStatusWithPrice}>
                        Guardar y Aprobar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default CoursesTable;
