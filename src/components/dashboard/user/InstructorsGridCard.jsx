import React, { Fragment, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Col, Card, Image, Row, Form, Button, Modal } from "react-bootstrap";
import { ChevronLeft, ChevronRight, Edit, Trash } from "react-feather";
import axios from "axios";
import Swal from "sweetalert2";

function InstructorsGridCard() {
  const [instructors, setInstructors] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const instructorsPerPage = 8;
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInstructorData, setEditInstructorData] = useState({
    id: null,
    nombre: "",
    email: "",
    celular: "",
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchInstructors = async () => {
    try {
      const response = await axios.get("http://localhost:3001/instructors");
      setInstructors(response.data);
    } catch (error) {
      console.error("Error al cargar los instructores:", error);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const pageCount = Math.ceil(instructors.length / instructorsPerPage);

  const handleShowEditModal = (instructor) => {
    setEditInstructorData({
      id: instructor.id,
      nombre: instructor.nombre,
      email: instructor.email,
      celular: instructor.celular,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditInstructorData({
      ...editInstructorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditInstructor = async () => {
    try {
      await axios.put(
        `http://localhost:3001/instructors/${editInstructorData.id}`,
        editInstructorData
      );
      setShowEditModal(false);
      fetchInstructors();
      Swal.fire({
        title: "¡Listo!",
        text: "Los datos del instructor han sido actualizados correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron actualizar los datos del instructor.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const showDeleteConfirmation = (id) => {
    setInstructorToDelete(id);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/instructors/${instructorToDelete}`);
      setShowConfirmationModal(false);
      fetchInstructors();
      Swal.fire({
        title: "¡Eliminado!",
        text: "El instructor ha sido eliminado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar al instructor.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value.trim()) {
      fetchInstructors(); // Recargar instructores si la búsqueda está vacía
      return;
    }
    const filteredInstructors = instructors.filter(
      (instructor) =>
        instructor.nombre.toLowerCase().includes(value) ||
        instructor.email.toLowerCase().includes(value) ||
        instructor.municipio.toLowerCase().includes(value)
    );
    setInstructors(filteredInstructors);
    setPageNumber(0); // Resetear a la primera página
  };

  const displayInstructors = instructors
    .slice(pageNumber * instructorsPerPage, pageNumber * instructorsPerPage + instructorsPerPage)
    .map((instructor) => (
      <Col xl={3} lg={6} md={6} sm={12} key={instructor.id}>
        <Card className="mb-5">
          <Card.Body>
            <div className="text-center">
              <Image
                  src={`data:image/jpeg;base64,${instructor.imagen}` || 'https://cdn-icons-png.flaticon.com/512/6326/6326055.png'}

                className="rounded-circle avatar-xl mb-3"
                alt=""
              />
              <h4 className="mb-0">{instructor.nombre}</h4>
              <p className="mb-0">{instructor.municipio}</p>
			  <p className="mb-0">{instructor.status}</p>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleShowEditModal(instructor)}
              >
                <Edit size={16} />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => showDeleteConfirmation(instructor.id)}
              >
                <Trash size={16} />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));

  // Retorno del componente, incluyendo modales para editar y confirmar eliminación
  return (
    <Fragment>
      <div className="mb-4">
        <Form.Control
          type="search"
          placeholder="Buscar Instructores"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Row>{displayInstructors}</Row>
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
          <Modal.Title>Editar Instructor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editInstructorName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={editInstructorData.nombre}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editInstructorEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editInstructorData.email}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editInstructorCelular">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="text"
                name="celular"
                value={editInstructorData.celular}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-sm" variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button className="btn-sm" style={{backgroundColor:"#042b61", border:"none"}} onClick={handleEditInstructor}>
            Guardar Cambios
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
          ¿Estás seguro de que quieres eliminar este instructor?
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
}

export default InstructorsGridCard;
