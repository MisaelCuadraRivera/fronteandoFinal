import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Modal, Form } from 'react-bootstrap';
import { XCircle, MoreVertical } from 'react-feather';
import DotBadge from 'components/elements/bootstrap/DotBadge';
import TanstackTable from 'components/elements/advance-table/TanstackTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import Icon from '@mdi/react';
import { Trash, Edit } from 'react-feather';

// Placeholder para cuando no haya imagen disponible
const defaultImage = '/path-to-placeholder-image.jpg';

// Función para procesar imágenes
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

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [precio, setPrecio] = useState('');
  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/courses');
        const coursesWithImages = response.data.map((course) => ({
          ...course,
          image: getImageSrc(course.image), // Procesar la imagen al obtener los datos
        }));
        setCourses(coursesWithImages);
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/delete-course/${courseId}`);
        setCourses(courses.filter((course) => course.id !== courseId));
        Swal.fire('Eliminado', 'Curso eliminado correctamente', 'success');
      } catch (error) {
        console.error('Error al eliminar el curso:', error);
        Swal.fire('Error', 'No se pudo eliminar el curso', 'error');
      }
    }
  };

  const handleEdit = (course) => {
    setEditCourse(course);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditCourse(null);
  };

  const handleSaveChanges = async () => {
    if (!editCourse) return;
    try {
      await axios.put(`http://localhost:3001/update-course/${editCourse.id}`, editCourse);
      setCourses(
        courses.map((course) =>
          course.id === editCourse.id ? { ...course, ...editCourse } : course
        )
      );
      handleCloseModal();
      Swal.fire('Éxito', 'Curso actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error al actualizar el curso:', error);
      Swal.fire('Error', 'No se pudo actualizar el curso', 'error');
    }
  };

  const handleApprove = (courseId) => {
    setShowApproveModal(true);
    setCurrentCourseId(courseId);
  };

  const changeCourseStatusWithPrice = async () => {
    if (!precio) {
      Swal.fire('Error', 'Por favor, introduce un precio para el curso.', 'error');
      return;
    }
    try {
      await axios.post('http://localhost:3001/update-course-status', {
        id: currentCourseId,
        status: 'aprobado',
        precio: parseFloat(precio),
      });
      setCourses(
        courses.map((course) =>
          course.id === currentCourseId ? { ...course, status: 'aprobado', precio } : course
        )
      );
      setShowApproveModal(false);
      Swal.fire('Éxito', 'Curso aprobado correctamente', 'success');
    } catch (error) {
      console.error('Error al cambiar el estado del curso:', error);
      Swal.fire('Error', 'No se pudo aprobar el curso', 'error');
    }
  };

  const handleReject = (courseId) => {
    setCurrentCourseId(courseId);
    setShowRejectModal(true);
  };

  const confirmRejection = async () => {
    try {
      await axios.post('http://localhost:3001/update-course-status', {
        id: currentCourseId,
        status: 'rechazado',
      });
      setCourses(
        courses.map((course) =>
          course.id === currentCourseId ? { ...course, status: 'rechazado' } : course
        )
      );
      setShowRejectModal(false);
      Swal.fire('Rechazado', 'Curso rechazado correctamente', 'success');
    } catch (error) {
      console.error('Error al rechazar el curso:', error);
      Swal.fire('Error', 'No se pudo rechazar el curso', 'error');
    }
  };

  const columns = useMemo(
    () => [
      {
        header: 'Imagen',
        accessorKey: 'image',
        cell: (info) => (
          <Image
            src={info.getValue()}
            alt="Imagen del curso"
            className="img-fluid rounded"
            style={{ width: '100px' }}
          />
        ),
      },
      {
        header: 'Curso',
        accessorKey: 'title',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Instructor',
        accessorKey: 'instructor_name',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Estado',
        accessorKey: 'status',
        cell: ({ getValue }) => (
          <Fragment>
            <DotBadge
              bg={
                getValue()?.toLowerCase() === 'pendiente'
                  ? 'warning'
                  : getValue()?.toLowerCase() === 'aprobado'
                  ? 'success'
                  : 'danger'
              }
            />
            {getValue()}
          </Fragment>
        ),
      },
      {
        header: 'Acciones',
        id: 'actions',
        cell: ({ row }) => {
          const { id, status } = row.original;
          return (
            <Fragment>
              {status.toLowerCase() === 'pendiente' && (
                <Fragment>
                  <Button onClick={() => handleApprove(id)} variant="success" className="me-2 btn-sm">
                    Aprobar
                  </Button>
                  <Button onClick={() => handleReject(id)} variant="danger" className="btn-sm">
                    Rechazar
                  </Button>
                </Fragment>
              )}
            </Fragment>
          );
        },
    },
        {
            header: 'Acciones',
            id: 'actions',
            cell: ({ row }) => {
                const { id, status } = row.original;
    
                if (!status) return null; // Si no hay estado, no mostramos nada
    
                return (
                    <Fragment>
                        {status.toLowerCase() === 'pendiente' && (
                            <Fragment>
                                <Button onClick={() => handleApprove(id)} variant="success" className="me-2 btn-sm">
                                    Aprobar
                                </Button>
                                <Button onClick={() => changeCourseStatus(id, 'rechazado')} variant="danger" className="btn-sm">
                                    Rechazar
                                </Button>
                            </Fragment>
                        )}
                    </Fragment>
                );
            }
        },
        {
            header: 'Opciones',
            id: 'options',
            cell: ({ row }) => (
                <div>
                    <Button variant="outline-primary" size='sm' className="me-2" onClick={() => handleEdit(row.original)}>
                    <Edit size={16} />
                    </Button>
                    <Button variant="outline-danger" size='sm' onClick={() => handleDelete(row.original.id)}>
                        <Trash size={16} />
                    </Button>
                </div>
            )
        }
    
    ], [courses]);
    <Fragment>
      {/* Modal para rechazar curso */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Rechazo</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que quieres rechazar este curso?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmRejection}>
            Confirmar Rechazo
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar curso */}
      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editCourse ? 'Editar Curso' : 'Agregar Nuevo Curso'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce el título del curso"
                value={editCourse?.title || ''}
                onChange={(e) => setEditCourse({ ...editCourse, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descripción del curso"
                value={editCourse?.description || ''}
                onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio del curso"
                value={editCourse?.precio || ''}
                onChange={(e) => setEditCourse({ ...editCourse, precio: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
};

export default CoursesTable;