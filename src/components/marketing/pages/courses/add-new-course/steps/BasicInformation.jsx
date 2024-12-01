import React, { useState } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";
import { mdiSendVariant } from "@mdi/js";
import Swal from "sweetalert2";

const BasicInformation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "",
    description: "",
    applicantRequirements: "",
  });

  const [imageBase64, setImageBase64] = useState(null);

  const categoryOptions = [
    { value: "React", label: "React" },
    { value: "Javascript", label: "Javascript" },
    { value: "HTML", label: "HTML" },
    { value: "Vuejs", label: "Vue js" },
    { value: "Gulpjs", label: "Gulp js" },
    { value: "Python", label: "Python" },
  ];

  const levelOptions = [
    { value: "Principiante", label: "Principiante" },
    { value: "Intermedio", label: "Intermedio" },
    { value: "Avanzado", label: "Avanzado" },
  ];

  const MAX_IMAGE_SIZE = 83 * 1024; // Tamaño máximo permitido (83 KB)

  // Manejar los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar la selección de imágenes y convertirlas a Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Archivo no válido",
        text: "Por favor selecciona un archivo.",
        confirmButtonText: "Aceptar",
      });
      e.target.value = null; // Reiniciar el campo de archivo
      return;
    }

    const validExtensions = ["image/jpeg", "image/png", "image/gif"];
    if (!validExtensions.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Formato no soportado",
        text: "Selecciona una imagen en formato .jpg, .jpeg, .png o .gif.",
        confirmButtonText: "Aceptar",
      });
      e.target.value = null; // Reiniciar el campo de archivo
      return;
    }

    // Verificar el tamaño del archivo (83 KB = 83 * 1024 bytes)
    if (file.size > MAX_IMAGE_SIZE) {
      Swal.fire({
        icon: "error",
        title: "Imagen demasiado pesada",
        text: `El tamaño máximo permitido es 83 KB. La imagen seleccionada pesa ${(file.size / 1024).toFixed(2)} KB.`,
        confirmButtonText: "Aceptar",
      });
      e.target.value = null; // Reiniciar el campo de archivo
      return;
    }

    // Si pasa todas las validaciones, procesar el archivo
    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result); // Actualizar el estado solo si la imagen es válida
    };
    reader.readAsDataURL(file);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.level) {
      Swal.fire({
        icon: "error",
        title: "Campos requeridos",
        text: "Categoría y nivel son campos requeridos.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const payload = {
      ...formData,
      courseImage: imageBase64, // Enviar la imagen con el prefijo Base64
    };

    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Autenticación requerida",
        text: "Por favor inicia sesión.",
        confirmButtonText: "Ir al inicio de sesión",
      }).then(() => {
        navigate("/");
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/create-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("La respuesta del servidor no fue OK");
      }

      Swal.fire({
        icon: "success",
        title: "Curso creado",
        text: "El curso se ha enviado a revisión",
        confirmButtonText: "Aceptar",
      }).then(() => {
        navigate("/marketing/instructor/instructor-my-courses/");
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear el curso",
        text: "Por favor, inténtalo de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="mb-3">
        <Card.Header className="border-bottom px-4 py-3">
          <h4 className="mb-0">Información básica</h4>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title">Título del curso</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">Máximo 60 caracteres.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Selecciona una categoría</option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nivel del curso</Form.Label>
            <Form.Control
              as="select"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
            >
              <option value="">Selecciona un nivel</option>
              {levelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción del curso</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Portada del curso</Form.Label>
            <Form.Control
              id="courseImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Form.Text className="text-muted">
              Sube la imagen de tu curso aquí. Debe cumplir con los estándares:
              750x440 píxeles; .jpg, .jpeg, .gif o .png.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Requisitos del aspirante</Form.Label>
            <Form.Control
              type="text"
              placeholder="Requisitos"
              name="applicantRequirements"
              value={formData.applicantRequirements}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      <Container className="text-end">
        <Button
          type="submit"
          style={{
            backgroundColor: "#042b61",
            borderColor: "white",
            color: "white",
          }}
        >
          Mandar a revisión <Icon path={mdiSendVariant} size={0.8} />
        </Button>
      </Container>
    </Form>
  );
};

export default BasicInformation;
