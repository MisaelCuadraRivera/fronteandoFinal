import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { mdiArrowLeft } from '@mdi/js';
import { mdiArrowRight } from '@mdi/js';

const CoursesMedia = ({ next, previous, setFormData, formData }) => {
    // Modificado para usar setFormData y formData para actualizar el estado directamente con la imagen en Base64

    // Manejador para cambios en el input del archivo, que convierte la imagen a Base64
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(loadEvent) {
                // Actualiza el formData con la cadena Base64 de la imagen
                setFormData({ ...formData, courseImage: loadEvent.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Form>
            <Card className="mb-3 border-0">
                <Card.Header className="border-bottom px-4 py-3">
                    <h4 className="mb-0">Imágenes</h4>
                </Card.Header>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Portada del curso</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                id="inputCourseImage"
                                type="file"
                                className="form-control"
                                onChange={handleFileChange} // Añade el manejador de cambio aquí
                            />
                            <Form.Label htmlFor="inputCourseImage" className="input-group-text">
                                Subir
                            </Form.Label>
                        </div>
                        <Form.Text className="text-muted">
                            Sube la imagen de tu curso aquí. Debe cumplir con nuestra imagen del curso estándares de calidad que deben ser aceptados. Pautas importantes: 750x440 píxeles; .jpg, .jpeg, .gif o .png. No hay texto en la imagen.
                        </Form.Text>
                    </Form.Group>
                </Card.Body>
            </Card>
            <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={previous}>
                    Anterior
                </Button>
                <Button onClick={next} style={{ backgroundColor: "#042b61", borderColor: "white", color: "white" }}>
                    Siguiente
                </Button>
            </div>
        </Form>
    );
};

export default CoursesMedia;



