import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Edit, Trash, } from 'react-feather';
import { Col, Row, Card, Button, Modal, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import TanstackTable from 'components/elements/advance-table/TanstackTable';
import Swal from 'sweetalert2';


const CoursesCategory = () => {
  const handleShow = () => setShow(true);
  const [categoryError, setCategoryError] = useState('');
  const [show, setShow] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState(null);

  const handleClose = () => {
    setShow(false);
    setCategoryError('');
    setNewCategory('');
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await axios.get('http://localhost:3001/categories');
    setCategories(response.data);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setCategoryError('El nombre de la categoría no puede estar vacío.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/categories', { categoria: newCategory });
      setNewCategory('');
      setShow(false);
      loadCategories();
    } catch (error) {
      console.error("Error al agregar la categoría", error);
      // Manejar más errores aquí si es necesario
    }
  };

  const handleChange = (e) => {
    setNewCategory(e.target.value);
    if (categoryError) {
      setCategoryError('');
    }
  };

  const handleShowEditModal = (categoryId, name) => {
    setEditCategoryId(categoryId);
    setEditCategoryName(name);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditCategoryName('');
    setShowEditModal(false);
  };

  const handleEditCategory = async () => {
    try {
      await axios.put(`http://localhost:3001/categories/${editCategoryId}`, { name: editCategoryName });
      setEditCategoryName('');
      setShowEditModal(false);
      loadCategories();
      Swal.fire({
        title: '¡Éxito!',
        text: 'La categoría ha sido actualizada correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar la categoría.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };


  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`http://localhost:3001/categories/${categoryToDeleteId}`);
      setShowDeleteModal(false);
      loadCategories();
      Swal.fire({
        title: '¡Eliminado!',
        text: 'La categoría ha sido eliminada correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar la categoría.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };


  const columns = useMemo(
    () => [
      { accessorKey: "categorias", header: "Categoria" },
      {
        accessorKey: "fecha_creacion",
        header: "Fecha de creación",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        header: 'Acciones',
        id: 'actions',
        cell: (info) => {
          return (
            <div className="d-flex">
              <Button variant="secondary" className="me-2 btn-sm" onClick={() => handleShowEditModal(info.row.original.ID, info.row.original.categorias)}>
                <Edit size={12} />
              </Button>
              <Button variant="danger" className='btn-sm' onClick={() => { setShowDeleteModal(true); setCategoryToDeleteId(info.row.original.ID); }}>
                <Trash size={12} />
              </Button>
            </div>
          );
        }
      }
    ], []);

  const data = useMemo(() => categories, [categories]);

  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Categoria de cursos</h1>

            </div>
            <div>
              <Button onClick={handleShow} style={{ backgroundColor: "#042b61", border: "none" }}>
                Agregar nueva categoria
              </Button>
              <Modal show={show} onHide={handleClose}>
                {/* Contenido del Modal */}
                <Form className='m-2'>
                  <Form.Group className="mb-3" controlId="formCategoryName">
                    <Form.Label className='m-3'>Nombre de la categoría</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Introduce la categoría"
                      value={newCategory}
                      onChange={handleChange}
                      className='w-100 '
                      isInvalid={!!categoryError}
                    />
                    <Form.Control.Feedback type="invalid" className="">
                      {categoryError}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Container className='text-end'>
                    <Button variant='secondary' className='btn-sm' onClick={handleClose}>Cancelar</Button>
                    <Button className='btn-sm m-1' variant="primary" onClick={handleAddCategory}>
                      Agregar categoría
                    </Button>
                  </Container>
                </Form>
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
                pagination={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editCategoryName">
              <Form.Label>Nombre de la Categoría</Form.Label>
              <Form.Control
                type="text"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={handleEditCategory}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que quieres eliminar esta categoría?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteCategory}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );

};

export default CoursesCategory;
