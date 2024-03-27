// import node module libraries
import Icon from '@mdi/react';
import { Card, Form, Button } from 'react-bootstrap';
import { mdiArrowLeft } from '@mdi/js';
import { mdiArrowRight } from '@mdi/js';

const CoursesMedia = (props) => {
	const { next, previous } = props;

	return (
		<Form>
			{/* Card */}
			<Card className="mb-3  border-0">
				<Card.Header className="border-bottom px-4 py-3">
					<h4 className="mb-0">Imágenes</h4>
				</Card.Header>
				{/* Card body */}
				<Card.Body>
					{/* Course cover image */}
					<Form.Label>Portada del curso</Form.Label>
					<Form.Group className="mb-1 input-group">
						<Form.Control
							id="inputfavicon"
							type="file"
							className="form-control"
						/>
						<Form.Label
							htmlFor="inputfavicon"
							className="input-group-text mb-0"
						>
							Subir
						</Form.Label>
						<Form.Text className="text-muted">
							Sube la imagen de tu curso aquí.
							Debe cumplir con nuestros estándares de calidad de imagen para ser aceptada. 
							Pautas importantes: 750x440 píxeles; .jpg, .jpeg, .gif o .png. sin texto en la imagen.
						</Form.Text>
					</Form.Group>

				</Card.Body>
			</Card>

			{/* Button */}
			<div className="d-flex justify-content-between">
				<Button variant="secondary" onClick={previous}>
				<Icon path={mdiArrowLeft} size={0.8} />{" "} Anterior 
				</Button>

				<Button onClick={next} style={{ backgroundColor: "#042b61", borderColor: "white", color: "white" }}>
					Siguiente <Icon path={mdiArrowRight} size={0.8} />
				</Button>

			</div>
		</Form>
	);
};
export default CoursesMedia;
