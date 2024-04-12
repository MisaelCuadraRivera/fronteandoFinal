// import node module libraries
import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Col, Card, Image, Row, Form, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
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
					<Card className="mb-4">
						<Card.Body>
							<div className="text-center">
								<Image
									src={student.imagen ? `data:image/png;base64,${student.imagen}` : 'default-avatar.png'}
									className="rounded-circle avatar-xl mb-3"
									alt={student.nombre}
								/>
									
								<h4 className="mb-1">{student.nombre}</h4>
								<h4 className="mb-1">{student.email}</h4>
								<h4 className="mb-1">{formatDate(student.fecha_inscripcion)}</h4>
								<h4 className="mb-1">{student.courseTitle}</h4>

								<Button variant="outline-secondary" className="mt-3" onClick={() => certifyStudent(student.name)}>
									Certificar <i className="fe fe-file-text ms-1"></i>
								</Button>
							</div>
						</Card.Body>
					</Card>
				</Col>
			);
		});

	const certifyStudent = useCallback((studentName) => {
		Swal.fire({
			title: `¿Seguro que quieres certificar al alumno?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '¡Sí, certificar!',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				const doc = new jsPDF();
				doc.text(`Certificado de finalización`, 20, 20);
				doc.text(`Este documento certifica que ${student.nombre} ha completado satisfactoriamente el curso.`, 20, 30);
				doc.save('certificado.pdf');
				Swal.fire(
					'¡Certificado!',
					`El alumno ${student.nombre} ha sido certificado y se ha generado su certificado.`,
					'success'
				);
			}
		});
	}, []);

	// Alertirri
	const alert = () => {
		Swal.fire({
			title: "¿Estas seguro de realizar esta acción?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Accept"
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire({
				title: "Descargando...",
				text: "Tu archivo se esta descargando. Por favor espera...",
				icon: "success"
			  });
			}
		  });
	}

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
							<Link to="#" className="btn btn-secondary" onClick={alert}>
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
