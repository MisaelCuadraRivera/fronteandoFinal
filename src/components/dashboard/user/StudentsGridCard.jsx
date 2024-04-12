import React, { Fragment, useState, useEffect } from "react";
import { Col, Card, Image, Row, Form, Button, Modal } from "react-bootstrap";
import { ChevronLeft, ChevronRight, MapPin, Edit, Trash } from "react-feather";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Swal from "sweetalert2";

const StudentsGridCard = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editStudentData, setEditStudentData] = useState({
    id: null,
    nombre: "",
    email: "",
    celular: "",
  });
  const [students, setStudents] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const studentsPerPage = 8;
  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/students");
      setStudents(response.data);
      setPageCount(Math.ceil(response.data.length / studentsPerPage));
    } catch (error) {
      console.error("Error al cargar los estudiantes:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleShowEditModal = (student) => {
    setEditStudentData({
      id: student.id,
      nombre: student.nombre,
      email: student.email,
      celular: student.celular,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditStudentData({ ...editStudentData, [e.target.name]: e.target.value });
  };

  const handleEditStudent = async () => {
    try {
      await axios.put(
        `http://localhost:3001/students/${editStudentData.id}`,
        editStudentData
      );
      setShowEditModal(false);
      fetchStudents();
      Swal.fire({
        title: '¡Listo!',
        text: 'Los datos del estudiante han sido actualizados correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      console.error("Error al actualizar el estudiante:", error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar la información del estudiante.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };


  const showDeleteConfirmation = (id) => {
    setStudentToDelete(id);
    setShowConfirmationModal(true);
  };

  // Función que realmente elimina el estudiante
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/students/${studentToDelete}`);
      setShowConfirmationModal(false); // Cierra el modal de confirmación
      fetchStudents(); // Recarga la lista de estudiantes después de eliminar
      Swal.fire({
        title: '¡Eliminado!',
        text: 'El estudiante ha sido eliminado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

    } catch (error) {
      console.error("Error al eliminar el estudiante:", error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar al estudiante.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const displayStudents = students
    .slice(
      pageNumber * studentsPerPage,
      pageNumber * studentsPerPage + studentsPerPage
    )
    .map((student) => (
      <Col xl={3} lg={6} md={6} sm={12} key={student.id}>
        <Card className="mb-5">
          <Card.Body>
            <div className="text-center">
              <div className="position-relative">
                <Image
                  src={`data:image/jpeg;base64,${student.imagen}` || 'https://cdn-icons-png.flaticon.com/512/6326/6326055.png'}
                  className="rounded-circle avatar-xl mb-3"
                  alt=""
                />
              </div>
              <h4 className="mb-0">{student.nombre}</h4>
              <p className="mb-0">
                <MapPin size="12" className="me-1 fs-6" />
                {student.municipio}
              </p>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2 mt-6">
              <span className="text-dark">{student.email}</span>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2 mt-2 ">
              <span className="text-dark">{student.celular}</span>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleShowEditModal(student)}
              >
                <Edit size={16} />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => showDeleteConfirmation(student.id)}
              >
                <Trash size={16} />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value.trim()) {
      fetchStudents(); // Recargar estudiantes si la búsqueda está vacía
      return;
    }

    const filteredStudents = students.filter(
      (student) =>
        student.nombre.toLowerCase().includes(value) ||
        student.email.toLowerCase().includes(value) ||
        student.municipio.toLowerCase().includes(value)
    );

    setStudents(filteredStudents);
    setPageNumber(0); // Resetear a la primera página
    setPageCount(Math.ceil(filteredStudents.length / studentsPerPage)); // Recalcular el total de páginas
  };

  return (
    <Fragment>
      <div className="mb-4">
        <Form.Control
          type="search"
          placeholder="Buscar Estudiantes"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Row>{displayStudents}</Row>
      <ReactPaginate
        previousLabel={<ChevronLeft size="14px" />}
        nextLabel={<ChevronRight size="14px" />}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"justify-content-center mb-0 pagination"}
        previousLinkClassName={"page-link mx-1 rounded"}
        nextLinkClassName={"page-link mx-1 rounded"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link mx-1 rounded"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"active"}
      />
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editStudentName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={editStudentData.nombre}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editStudentEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editStudentData.email}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editStudentCelular">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="text"
                name="celular"
                value={editStudentData.celular}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-sm" variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button className="btn-sm" variant="primary" onClick={handleEditStudent}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar este estudiante?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

    </Fragment>
  );
};

export default StudentsGridCard;
