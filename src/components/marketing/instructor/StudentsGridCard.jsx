// import node module libraries
import React, { useState, Fragment, useCallback } from 'react';
import { Col, Card, Image, Row, Form, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import imgCertificado from 'assets/images/img-certificate.png';

// import data files
import { StudentsList } from 'data/users/StudentsData';

const StudentsGridCard = () => {
	const [students, setStudentsList] = useState(StudentsList.slice(0, 500));

	// paging start
	const [pageNumber, setPageNumber] = useState(0);
	const studentsPerPage = 9;
	const pagesVisited = pageNumber * studentsPerPage;
	const pageCount = Math.ceil(students.length / studentsPerPage);
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};
	const displayStudents = students
		.slice(pagesVisited, pagesVisited + studentsPerPage)
		.map((students) => {
			return (
				<Col xl={4} lg={4} md={6} sm={12} key={students.id}>
					<Card className="mb-4">
						<Card.Body>
							<div className="text-center">
								<Image
									src={students.image}
									className="rounded-circle avatar-xl mb-3"
									alt=""
								/>
								<h4 className="mb-1">{students.name}</h4>
								<p className="mb-0 fs-6">
									<i className="fe fe-map-pin me-1"></i>
									{students.locations}
								</p>
								<Button variant="outline-success" className="mt-3" onClick={() => certifyStudent(students.name)}>
									Certificar <i className="fe fe-file-text ms-1"></i>
								</Button>
							</div>
							<div className="d-flex justify-content-between border-bottom py-2 mt-4 fs-6">
								<span>Inscrito</span>
								<span className="text-dark">{students.joined}</span>
							</div>
							<div className="d-flex justify-content-between pt-2 fs-6">
								<span>Progreso</span>
								<span className="text-success">{students.progress}%</span>
							</div>
						</Card.Body>
					</Card>
				</Col>
			);
		});
	// end of paging

	// searching code started

	const [searchTerm, setSearchTerm] = useState('');

	const getSearchTerm = (event) => {
		let searchTerm = event.target.value;
		setSearchTerm(searchTerm);
		if (searchTerm !== '') {
			const newStudentsList = StudentsList.filter((student) => {
				return Object.values(student)
					.join(' ')
					.toLowerCase()
					.includes(searchTerm.toLowerCase());
			});
			setStudentsList(newStudentsList.slice(0, 500));
			setPageNumber(0);
		} else {
			setStudentsList(StudentsList.slice(0, 500));
		}
	};

	// end of searching
	const certifyStudent = useCallback((studentName, courseName) => {
		Swal.fire({
			title: `¿Seguro que quieres certificar al alumno ${studentName}?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#042b61',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Certificar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				const doc = new jsPDF({
					orientation: 'landscape',  // Configura la orientación como paisaje
					unit: 'mm',
					format: 'a4'
				});

				
				const imageURL = ''; 
				// Calcular la nueva altura manteniendo la relación de aspecto
				const scaledHeight = 297 * (1414 / 2000);
				
				// Agregar imagen de fondo
				doc.addImage(imageURL, 'JPEG', 0, 0, 297, scaledHeight);

				// Agregar texto personalizado
				doc.setFontSize(22);
				doc.text('Certificado de finalización', 148.5, 50, { align: 'center' }); // Centro en paisaje
				doc.setFontSize(16);
				doc.text(`Este documento certifica que:`, 148.5, 70, { align: 'center' });
				doc.setFontSize(18);
				doc.text(studentName, 148.5, 90, { align: 'center' });
				doc.text(`ha completado satisfactoriamente el curso de`, 148.5, 110, { align: 'center' });
				doc.text(courseName, 148.5, 130, { align: 'center' });

				// Guardar el PDF. El nombre del archivo será 'certificado.pdf'
				doc.save('certificado.pdf');

				Swal.fire(
					'¡Certificado!',
					`El alumno ${studentName} ha sido certificado y se ha generado su certificado.`,
					'success'
				);
			}
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
				{displayStudents.length > 0 ? (
					displayStudents
				) : (
					<Col>Resultado no encontrado.</Col>
				)}
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
