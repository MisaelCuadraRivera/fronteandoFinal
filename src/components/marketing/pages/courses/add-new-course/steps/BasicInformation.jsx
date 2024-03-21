// import node module libraries
import { Card, Form, Button } from 'react-bootstrap';

// import custom components
import { FormSelect } from 'components/elements/form-select/FormSelect';
import ReactQuillEditor from 'components/elements/editor/ReactQuillEditor';

const BasicInformation = (props) => {
	const { next } = props;

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

	const initialValue = `<p>Descripción</p>
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
						<Form.Label htmlFor="courseTitle">Titulo del Curso</Form.Label>
						<Form.Control
							type="text"
							placeholder="Titulo del curso"
							id="course_title"
							name="course_title"
						/>
						<Form.Text className="text-muted">
							Máximo 60 carácteres para el titulo.
						</Form.Text>
					</Form.Group>

					{/* Category */}
					<Form.Group className="mb-3">
						<Form.Label>Categoria</Form.Label>
						<FormSelect
							options={categoryOptions}
							id="category_category"
							name="category_category"
							placeholder="Selecciona una categoria"
						/>
						<Form.Text className="text-muted">
						Ayuda a las personas a encontrar tus cursos eligiendo categorías que representen tu curso.
						</Form.Text>
					</Form.Group>

					{/* Courses level */}
					<Form.Group className="mb-3">
						<Form.Label>Nivel de curso</Form.Label>
						<FormSelect
							options={CoursesLevel}
							id="courses_level"
							name="courses_level"
							placeholder="Selecciona el nivel"
						/>
					</Form.Group>

					{/* Course Description*/}
					<Form.Group className="mb-3">
						<Form.Label>Descripción del curso</Form.Label>
						<ReactQuillEditor
							initialValue={initialValue}
							id="course_description"
							name="course_description"
						/>
						<Form.Text className="text-muted">
							un breve resumen de tus cursos.
						</Form.Text>
					</Form.Group>
				</Card.Body>
			</Card>
			{/* Button */}
			<Button variant="primary" onClick={next}>
				Siguiente
			</Button>
		</Form>
	);
};
export default BasicInformation;
