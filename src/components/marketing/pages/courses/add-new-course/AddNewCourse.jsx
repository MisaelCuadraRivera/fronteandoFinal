import React, { useState, Fragment } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Importa los componentes de cada paso del formulario
import GKStepper from 'components/elements/stepper/GKStepper';
import BasicInformation from './steps/BasicInformation';


const AddNewCourse = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        level: '',
        description: '',
        applicant_requirements: '', // Asegúrate de incluir este campo
        courseImage: '', // Este campo almacenará la imagen en Base64
    });

    // Actualiza formData cuando cualquier campo cambia
    const handleChange = (name, value) => {
        console.log(name, value); // Para verificar que se estén recibiendo correctamente los datos
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    

    const next = () => setCurrentStep(currentStep >= 3 ? 3 : currentStep + 1);
    const previous = () => setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);

    // Función para manejar el envío del formulario al servidor
    // Función para manejar el envío del formulario al servidor
const handleSubmitCourse = async () => {
    // Convertir formData a una cadena JSON válida
    const formDataJSON = JSON.stringify(formData);
    
    try {
        const response = await fetch('http://localhost:3001/create-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON, // Enviar la cadena JSON
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            alert('Curso creado con éxito');
        } else {
            alert('Error al crear el curso');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al crear el curso');
    }
};


    const steps = [
        {
            id: 1,
            title: 'Información básica',
            content: <BasicInformation data={formData} handleChange={handleChange} setFormData={setFormData} next={next} />,
        },
    ];

    return (
        <Fragment>
            <section className="py-4 py-lg-6" style={{backgroundColor:"#009475"}}>
                <Container>
                    <Row>
                        <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                            <div className="d-lg-flex align-items-center justify-content-between">
                                <div className="mb-4 mb-lg-0">
                                    <h1 className="text-white mb-1">Crear un nuevo curso</h1>
                                    <p className="mb-0 text-white lead">Rellena el formulario.</p>
                                </div>
                                <div>
                                    <Link to="/marketing/instructor/instructor-my-courses/" className="btn btn-white btn-sm">Regresar a cursos</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <GKStepper currentStep={currentStep} steps={steps} />
        </Fragment>
    );
};

export default AddNewCourse;
