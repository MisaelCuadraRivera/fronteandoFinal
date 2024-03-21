// import node module libraries
import { Card, Form, Button } from 'react-bootstrap';

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
							Upload your course image here. It must meet our course image
							quality standards to be accepted. Important guidelines: 750x440
							pixels; .jpg, .jpeg,. gif, or .png. no text on the image.
						</Form.Text>
					</Form.Group>
					
				</Card.Body>
			</Card>

			{/* Button */}
			<div className="d-flex justify-content-between">
				<Button variant="secondary" onClick={previous}>
					Anterior
				</Button>
				
				<Button className='btn-sm' onClick={next} style={{ backgroundColor: "#042b61", borderColor: "white", color: "white" }}>
					Siguiente
				</Button>
			
			</div>
		</Form>
	);
};
export default CoursesMedia;
