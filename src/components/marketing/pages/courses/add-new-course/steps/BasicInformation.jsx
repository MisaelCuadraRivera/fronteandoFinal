// import node module libraries
import { Card, Form, Button, Container } from 'react-bootstrap';

// import custom components
import { FormSelect } from 'components/elements/form-select/FormSelect';
import ReactQuillEditor from 'components/elements/editor/ReactQuillEditor';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';

const BasicInformation = (props) => {
	const { next, handleChange, setFormData } = props;

	const categoryOptions = [
		{ value: 'React', label: 'React' },
		{ value: 'Javascript', label: 'Javascript' },
		{ value: 'HTML', label: 'HTML' },
		{ value: 'Vuejs', label: 'Vue js' },
		{ value: 'Gulpjs', label: 'Gulp js' }
	];

	const CoursesLevel = [
		{ value: 'Intermediate', label: 'Intermedio' },
		{ value: 'Beignners', label: 'Principiante' },
		{ value: 'Advance', label: 'Avanzado' }
	];

	const initialValue = `<p>Escribe la descripción del curso</p>
                      <p><br /></p>        
                      <p></p>
                      <p><br /></p><p><br /></p><p><br /></p><p><br /></p>`;

	return (
		<Form>
			{/* Card */}
			<Card className="mb-3 ">
				<Card.Header className="border-bottom px-4 py-3">
					<h4 className="mb-0">Información básica</h4>
				</Card.Header>
				{/* Card body */}
				<Card.Body>
					{/* Title  */}
					<Form.Group className="mb-3">
						<Form.Label htmlFor="courseTitle">Título del curso</Form.Label>
						<Form.Control
							type="text"
							placeholder="Título"
							id="title"
							name="title"
							onChange={(e) => props.setFormData(e.target.name, e.target.value)}
						/>
						<Form.Text className="text-muted">
							Máximo 60 caracteres.
						</Form.Text>
					</Form.Group>

					{/* Category */}
					<Form.Group className="mb-3">
						<Form.Label>Categoría</Form.Label>
						<FormSelect
							options={categoryOptions}
							id="category"
							name="category"
							placeholder="Selecciona una categoría"
							onChange={(e) => props.handleChange(e.target.name, e.target.value)}
						/>
						<Form.Text className="text-muted">
							Ayuda a las personas a encontrar los cursos en base a categorías.
						</Form.Text>
					</Form.Group>

					{/* Courses level */}
					<Form.Group className="mb-3">
						<Form.Label>Nivel del curso</Form.Label>
						<FormSelect
							options={CoursesLevel}
							id="level"
							name="level"
							placeholder="Selecciona un nivel"
							onChange={(e) => props.handleChange(e.target.name, e.target.value)}
						/>
					</Form.Group>

					{/* Course Description*/}
					<Form.Group className="mb-3">
						<Form.Label>Descripción del curso</Form.Label>
						<ReactQuillEditor
							initialValue={initialValue}
							id="description"
							name="description"
							onChange={(e) => props.handleChange(e.target.name, e.target.value)}
						/>
						<Form.Text className="text-muted">
							Un resumen pequeño del curso.
						</Form.Text>
					</Form.Group>
				</Card.Body>
			</Card>
			{/* Button */}
			<Container className='text-end'>
				<Button onClick={next} style={{ backgroundColor: "#042b61", borderColor: "white", color: "white" }}>
					Siguiente <Icon path={mdiArrowRight} size={0.8} />
				</Button>
			</Container>

		</Form>
	);
};
export default BasicInformation;
