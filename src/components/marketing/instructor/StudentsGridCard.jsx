// import node module libraries
import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Col, Card, Image, Row, Form, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import imgCertificado from 'assets/images/img-certificate.png';

// import data files
import { StudentsList } from 'data/users/StudentsData';
import axios from 'axios';

const StudentsGridCard = () => {
	const [students, setStudentsList] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const studentsPerPage = 9;
	const pagesVisited = pageNumber * studentsPerPage;
	const pageCount = Math.ceil(students.length / studentsPerPage);
	const [searchTerm, setSearchTerm] = useState('');
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toISOString().split('T')[0]; // Esto devuelve la fecha en formato 'YYYY-MM-DD'
	};


	useEffect(() => {
		fetchStudents();
	}, [searchTerm]); // Re-fetch when searchTerm changes

	const fetchStudents = async () => {
		const token = localStorage.getItem('token'); // Suponiendo que el token está almacenado en localStorage
		console.log("Fetching students with searchTerm:", searchTerm);
		try {
			const response = await axios.get('http://localhost:3001/api/instructor/students', {
				headers: {
					Authorization: `Bearer ${token}` // Asegúrate de incluir el token aquí
				},
				params: { search: searchTerm }
			});
			console.log("Data received:", response.data);
			setStudentsList(response.data);
		} catch (error) {
			console.error('Error fetching students:', error);
			console.log(error.response);
		}
	};

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	const getSearchTerm = (event) => {
		setSearchTerm(event.target.value);
	};

	const displayStudents = students
		.slice(pagesVisited, pagesVisited + studentsPerPage)
		.map((student) => {
			return (
				<Col xl={4} lg={4} md={6} sm={12} key={student.id}>
					<Card className="mb-4 shadow-sm">  {/* Agregado shadow-sm para dar profundidad */}
						<Card.Body>
							<div className="text-center">
								<Image
									src={student.imagen ? `data:image/png;base64,${student.imagen}` : 'default-avatar.png'}
									className="rounded-circle avatar-xl mb-3"
									alt={student.nombre}
								/>
								<h4 className="mb-1 font-weight-bold">{student.nombre}</h4>
								<p className="text-muted mb-1">{student.email}</p>
								<p className="text-muted mb-1">{formatDate(student.fecha_inscripcion)}</p>
								<p className="text-muted mb-1">{student.courseTitle}</p>

								<Button variant="success" className="mt-3" onClick={() => certifyStudent(student)}>
									Certificar <i className="fe fe-file-text ms-1"></i>
								</Button>



							</div>
						</Card.Body>
					</Card>
				</Col>

			);
		});

	const certifyStudent = useCallback((student) => {
		console.log('Estudiante actual:', student);
		// Asegúrate de que `student` y sus propiedades están definida

		// Ahora es seguro asumir que `student.name` y `student.courseTitle` existen.
		const studentName = student.nombre; // Asegúrate de usar el nombre correcto de la propiedad
		const courseName = student.courseTitle;

		Swal.fire({
			title: `¿Seguro que quieres certificar al alumno?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#042b61',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Certificar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				const doc = new jsPDF({
					orientation: 'landscape',
					unit: 'mm',
					format: 'a4'
				});
				const originalWidth = 2000; // Ancho original
				const originalHeight = 1414; // Altura original

				const scaledHeight = 297 * (originalHeight / originalWidth); // 297mm es el ancho de una página A4 en orientación paisaje
				const studentNameX = 170; // Coordenada x para centrar
				const studentNameY = 74; // Coordenada y para el nombre del estudiante

				const courseNameX = 180; // Coordenada x para centrar
				const courseNameY = 130; // Coordenada y para el nombre del curso

				// Agregar imagen de fondo

				// Agregar texto personalizado
				try {
					doc.setFont("helvetica");
					doc.addImage(imgCertificado, 'PNG', 0, 0, 297, scaledHeight);
					doc.setFontSize(24); // Elige un tamaño de fuente adecuado
					doc.text(student.nombre, studentNameX, studentNameY, { align: 'center' });
					doc.setFontSize(24);
					doc.text(student.courseTitle, courseNameX, courseNameY, { align: 'center' });
					doc.save('certificado.pdf');

				} catch (error) {
					console.error('Error generating PDF:', error);
					Swal.fire({
						title: 'Error',
						text: 'Ha ocurrido un error al generar el certificado.',
						icon: 'error',
						confirmButtonColor: '#d33',
					});

				}

				// Código para mostrar el Swal de éxito
			}
		}).catch((error) => {
			// Manejo del error de la promesa
			console.error('Error with Swal:', error);
			Swal.fire({
				title: 'Error inesperado',
				text: 'Ha ocurrido un error inesperado al certificar al alumno.',
				icon: 'error',
				confirmButtonColor: '#d33',
			});
		});
	}, []);


	return (
		<Fragment>
			<Row>
				<Col xl={12} lg={12} sm={12} className="mb-3">
					<Row>
						<Col className="pe-0">
							<Form.Group className="mb-3" controlId="formSearchbyName">
								<Form.Control
									placeholder="Buscar por nombre"
									type="search"
									value={searchTerm}
									onChange={getSearchTerm}
								/>
							</Form.Group>
						</Col>
						<Col xs="auto">
							<Link to="#" className="btn btn-primary">
								Exportar XSL
							</Link>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				{displayStudents.length > 0 ? displayStudents : <Col>Resultado no encontrado.</Col>}
			</Row>
			<ReactPaginate
				previousLabel={<ChevronLeft size="14px" />}
				nextLabel={<ChevronRight size="14px" />}
				pageCount={pageCount}
				onPageChange={changePage}
				containerClassName={'justify-content-center mb-0 pagination'}
				previousLinkClassName={'page-link mx-1 rounded'}
				nextLinkClassName={'page-link mx-1 rounded'}
				pageClassName={'page-item'}
				pageLinkClassName={'page-link mx-1 rounded'}
				disabledClassName={'paginationDisabled'}
				activeClassName={'active'}
			/>
		</Fragment>
	);
};

export default StudentsGridCard;
