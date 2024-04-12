import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash, MoreVertical } from 'react-feather';
import { Col, Row, Dropdown, Card, Breadcrumb, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import TanstackTable from 'components/elements/advance-table/TanstackTable';

const CoursesCategory = () => {
  const handleShow = () => setShow(true);
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

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await axios.get('http://localhost:3001/categories');
    setCategories(response.data);
  };

  const handleAddCategory = async () => {
    await axios.post('http://localhost:3001/categories', { name: newCategoryName });
    setNewCategoryName('');
    setShowAddModal(false);
    loadCategories();
  };

  const handleShowEditModal = (categoryId, name) => {
    setEditCategoryId(categoryId);
    setEditCategoryName(name);
    setShowEditModal(true);
  };

  const handleEditCategory = async () => {
    await axios.put(`http://localhost:3001/categories/${editCategoryId}`, { name: editCategoryName });
    setEditCategoryName('');
    setShowEditModal(false);
    loadCategories();
  };

  const handleDeleteCategory = async () => {
    await axios.delete(`http://localhost:3001/categories/${categoryToDeleteId}`);
    setShowDeleteModal(false);
    loadCategories();
  };

  const columns = useMemo(
    () => [
      { accessorKey: "categorias", header: "Categoria" },
      {
        accessorKey: "fecha_creacion",
        header: "Fecha de creacion",
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
              <Modal show={show} onHide={() => setShow(false)}>
                {/* Contenido del Modal */}
                <Form>
                  <Form.Group className="mb-3" controlId="formCategoryName">
                    <Form.Label>Nombre de la Categoría</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Introduce la categoría"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleAddCategory}>
                    Agregar Categoría
                  </Button>
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
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
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
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button style={{backgroundColor:"#042b61", border: "none"}} onClick={handleEditCategory}>
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
