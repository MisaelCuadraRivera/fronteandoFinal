// import node module libraries
import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Col, Card, Image, Row, Form, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import imgCertificado from 'assets/images/img-certificate.png';
import axios from 'axios';

// Imagen predeterminada si no hay disponible
const defaultImage = 'path/to/default-avatar.png';

// Método para procesar las imágenes
const getImageSrc = (image) => {
	try {
	  if (image && image.data) {
		// Validar si la imagen ya está en formato base64
		const base64HeaderPattern = /^data:image\/(jpeg|png|gif|webp);base64,/;
		if (base64HeaderPattern.test(String.fromCharCode(...image.data))) {
		  return String.fromCharCode(...image.data);
		}
  
		// Si no está en base64, procesar el buffer
		const base64String = btoa(
		  String.fromCharCode(...new Uint8Array(image.data))
		);
		return `data:image/jpeg;base64,${base64String}`;
	  }
	} catch (error) {
	  console.error('Error procesando la imagen:', error);
	}
  
	// Retornar imagen por defecto si algo falla
	return defaultImage;
  };
  

const StudentsGridCard = () => {
  const [students, setStudentsList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const studentsPerPage = 9;
  const pagesVisited = pageNumber * studentsPerPage;
  const pageCount = Math.ceil(students.length / studentsPerPage);
  const [searchTerm, setSearchTerm] = useState('');
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Devuelve 'YYYY-MM-DD'
  };

  useEffect(() => {
    fetchStudents();
  }, [searchTerm]);

  const fetchStudents = async () => {
    const token = localStorage.getItem('token');
    console.log('Fetching students with searchTerm:', searchTerm);
    try {
      const response = await axios.get('http://localhost:3001/api/instructor/students', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { search: searchTerm },
      });
      console.log('Data received:', response.data);
      setStudentsList(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
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
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <div className="text-center">
                <Image
                  src={getImageSrc(student.imagen)} // Procesar la imagen con el método
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

    const studentName = student.nombre;
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
          format: 'a4',
        });
        const originalWidth = 2000;
        const originalHeight = 1414;
        const scaledHeight = 297 * (originalHeight / originalWidth);

        const studentNameX = 170;
        const studentNameY = 74;

        const courseNameX = 180;
        const courseNameY = 130;

        try {
          doc.setFont('helvetica');
          doc.addImage(imgCertificado, 'PNG', 0, 0, 297, scaledHeight);
          doc.setFontSize(24);
          doc.text(studentName, studentNameX, studentNameY, { align: 'center' });
          doc.setFontSize(24);
          doc.text(courseName, courseNameX, courseNameY, { align: 'center' });
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
