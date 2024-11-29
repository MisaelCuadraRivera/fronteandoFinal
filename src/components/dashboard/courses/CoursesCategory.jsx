import React, { Fragment, useState, useEffect, useMemo } from "react";
import { Edit, Trash, List, PlusCircle } from "react-feather";
import { Col, Row, Card, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import TanstackTable from "components/elements/advance-table/TanstackTable";
import Swal from "sweetalert2";



const CoursesCategory = () => {
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newBuildingName, setNewBuildingName] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [selectedBuildingName, setSelectedBuildingName] = useState("");
  const [showAddBuildingModal, setShowAddBuildingModal] = useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showEditBuildingModal, setShowEditBuildingModal] = useState(false);
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [editBuildingId, setEditBuildingId] = useState(null);
  const [editBuildingName, setEditBuildingName] = useState("");
  const [editRoomId, setEditRoomId] = useState(null);
  const [editRoomName, setEditRoomName] = useState("");

  useEffect(() => {
    loadBuildings();
  }, []);

  const loadBuildings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/buildings");
      setBuildings(response.data);
    } catch (error) {
      console.error("Error al cargar edificios:", error);
    }
  };

  const loadRooms = async (buildingId, buildingName) => {
    try {
      const response = await axios.get(`http://localhost:3001/rooms/${buildingId}`);
      setRooms(response.data);
      setSelectedBuildingId(buildingId);
      setSelectedBuildingName(buildingName);
    } catch (error) {
      console.error("Error al cargar salones:", error);
    }
  };

  const handleAddBuilding = async () => {
    if (!newBuildingName.trim()) {
      return Swal.fire("Error", "El nombre del edificio no puede estar vacío.", "error");
    }
    try {
      await axios.post("http://localhost:3001/buildings", { name: newBuildingName });
      setNewBuildingName("");
      setShowAddBuildingModal(false);
      loadBuildings();
      Swal.fire("Éxito", "Edificio agregado correctamente.", "success");
    } catch (error) {
      console.error("Error al agregar el edificio:", error);
      Swal.fire("Error", "No se pudo agregar el edificio.", "error");
    }
  };

  const handleAddRoom = async () => {
    if (!newRoomName.trim() || !selectedBuildingId) {
      return Swal.fire("Error", "El salón debe tener un nombre y estar asociado a un edificio.", "error");
    }
    try {
      await axios.post("http://localhost:3001/rooms", { name: newRoomName, buildingId: selectedBuildingId });
      setNewRoomName("");
      setShowAddRoomModal(false);
      loadRooms(selectedBuildingId, selectedBuildingName);
      Swal.fire("Éxito", "Salón agregado correctamente.", "success");
    } catch (error) {
      console.error("Error al agregar el salón:", error);
      Swal.fire("Error", "No se pudo agregar el salón.", "error");
    }
  };

  const handleEditBuilding = async () => {
    if (!editBuildingName.trim()) {
      return Swal.fire("Error", "El nombre del edificio no puede estar vacío.", "error");
    }
    try {
      await axios.put(`http://localhost:3001/buildings/${editBuildingId}`, { name: editBuildingName });
      setEditBuildingName("");
      setShowEditBuildingModal(false);
      loadBuildings();
      Swal.fire("Éxito", "Edificio actualizado correctamente.", "success");
    } catch (error) {
      console.error("Error al editar el edificio:", error);
      Swal.fire("Error", "No se pudo actualizar el edificio.", "error");
    }
  };

  const handleEditRoom = async () => {
    if (!editRoomName.trim()) {
      return Swal.fire("Error", "El nombre del salón no puede estar vacío.", "error");
    }
    try {
      await axios.put(`http://localhost:3001/rooms/${editRoomId}`, { name: editRoomName });
      setEditRoomName("");
      setShowEditRoomModal(false);
      loadRooms(selectedBuildingId, selectedBuildingName);
      Swal.fire("Éxito", "Salón actualizado correctamente.", "success");
    } catch (error) {
      console.error("Error al editar el salón:", error);
      Swal.fire("Error", "No se pudo actualizar el salón.", "error");
    }
  };

  const handleDeleteBuilding = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto eliminará todos los salones asociados.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/buildings/${id}`);
        setSelectedBuildingId(null);
        setSelectedBuildingName("");
        loadBuildings();
        Swal.fire("Eliminado", "El edificio y sus salones han sido eliminados.", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el edificio.", "error");
      }
    }
  };

  const handleDeleteRoom = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/rooms/${id}`);
        loadRooms(selectedBuildingId, selectedBuildingName);
        Swal.fire("Eliminado", "El salón ha sido eliminado.", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el salón.", "error");
      }
    }
  };

  const buildingColumns = useMemo(() => [
    { accessorKey: "name", header: "Edificio" },
    {
      header: "Acciones",
      id: "actions",
      cell: (info) => (
        <div className="d-flex">
          <Button
            variant="info"
            className="me-2 btn-sm"
            onClick={() => loadRooms(info.row.original.id, info.row.original.name)}
          >
            <List size={12} /> Salones
          </Button>
          <Button
            variant="secondary"
            className="me-2 btn-sm"
            onClick={() => {
              setEditBuildingId(info.row.original.id);
              setEditBuildingName(info.row.original.name);
              setShowEditBuildingModal(true);
            }}
          >
            <Edit size={12} />
          </Button>
          <Button variant="danger" className="btn-sm" onClick={() => handleDeleteBuilding(info.row.original.id)}>
            <Trash size={12} />
          </Button>
        </div>
      ),
    },
  ], []);

  const roomColumns = useMemo(() => [
    { accessorKey: "name", header: "Salón" },
    {
      header: "Acciones",
      id: "actions",
      cell: (info) => (
        <div className="d-flex">
          <Button
            variant="secondary"
            className="me-2 btn-sm"
            onClick={() => {
              setEditRoomId(info.row.original.id);
              setEditRoomName(info.row.original.name);
              setShowEditRoomModal(true);
            }}
          >
            <Edit size={12} />
          </Button>
          <Button variant="danger" className="btn-sm" onClick={() => handleDeleteRoom(info.row.original.id)}>
            <Trash size={12} />
          </Button>
        </div>
      ),
    },
  ], []);

  return (
    <Fragment>
      <Row>
        <Col>
          <Button onClick={() => setShowAddBuildingModal(true)}>Agregar Edificio</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <TanstackTable data={buildings} columns={buildingColumns} />
        </Col>
      </Row>
      {selectedBuildingId && (
        <Row>
          <Col>
            <h5>Salones del Edificio: {selectedBuildingName}</h5>
            <Button onClick={() => setShowAddRoomModal(true)}>
              <PlusCircle size={12} /> Agregar Salón
            </Button>
            <TanstackTable data={rooms} columns={roomColumns} />
          </Col>
        </Row>
      )}

      {/* Modales */}
      <Modal show={showAddBuildingModal} onHide={() => setShowAddBuildingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Edificio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre del Edificio</Form.Label>
              <Form.Control value={newBuildingName} onChange={(e) => setNewBuildingName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddBuildingModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleAddBuilding}>Agregar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditBuildingModal} onHide={() => setShowEditBuildingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Edificio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre del Edificio</Form.Label>
              <Form.Control value={editBuildingName} onChange={(e) => setEditBuildingName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditBuildingModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleEditBuilding}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddRoomModal} onHide={() => setShowAddRoomModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Salón</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre del Salón</Form.Label>
              <Form.Control value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddRoomModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleAddRoom}>Agregar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditRoomModal} onHide={() => setShowEditRoomModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Salón</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre del Salón</Form.Label>
              <Form.Control value={editRoomName} onChange={(e) => setEditRoomName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditRoomModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleEditRoom}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CoursesCategory;
