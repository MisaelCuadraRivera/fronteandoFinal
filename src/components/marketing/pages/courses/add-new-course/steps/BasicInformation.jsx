// import node module libraries
import { Card, Form, Button, Container } from 'react-bootstrap';

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

<<<<<<< HEAD
	const initialValue = `<p>Descripción</p>
=======
	const initialValue = `<p>Escribe la descripción del curso</p>
                      <p><br /></p>        
                      <p></p>
>>>>>>> main
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
<<<<<<< HEAD
						<Form.Label htmlFor="courseTitle">Titulo del Curso</Form.Label>
						<Form.Control
							type="text"
							placeholder="Titulo del curso"
=======
						<Form.Label htmlFor="courseTitle">Título del curso</Form.Label>
						<Form.Control
							type="text"
							placeholder="Título"
>>>>>>> main
							id="course_title"
							name="course_title"
						/>
						<Form.Text className="text-muted">
<<<<<<< HEAD
							Máximo 60 carácteres para el titulo.
=======
							Máximo 60 caracteres.
>>>>>>> main
						</Form.Text>
					</Form.Group>

					{/* Category */}
					<Form.Group className="mb-3">
<<<<<<< HEAD
						<Form.Label>Categoria</Form.Label>
=======
						<Form.Label>Categoría</Form.Label>
>>>>>>> main
						<FormSelect
							options={categoryOptions}
							id="category_category"
							name="category_category"
<<<<<<< HEAD
							placeholder="Selecciona una categoria"
						/>
						<Form.Text className="text-muted">
						Ayuda a las personas a encontrar tus cursos eligiendo categorías que representen tu curso.
=======
							placeholder="Selecciona una categoría"
						/>
						<Form.Text className="text-muted">
							Ayuda a las personas a encontrar los cursos en base a categorías.
>>>>>>> main
						</Form.Text>
					</Form.Group>

					{/* Courses level */}
					<Form.Group className="mb-3">
<<<<<<< HEAD
						<Form.Label>Nivel de curso</Form.Label>
=======
						<Form.Label>Nivel del curso</Form.Label>
>>>>>>> main
						<FormSelect
							options={CoursesLevel}
							id="courses_level"
							name="courses_level"
<<<<<<< HEAD
							placeholder="Selecciona el nivel"
=======
							placeholder="Selecciona un nivel"
>>>>>>> main
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
<<<<<<< HEAD
							un breve resumen de tus cursos.
=======
							Un resumen pequeño del curso.
>>>>>>> main
						</Form.Text>
					</Form.Group>
				</Card.Body>
			</Card>
			{/* Button */}
<<<<<<< HEAD
			<Button variant="primary" onClick={next}>
				Siguiente
			</Button>
=======
			<Container className='text-end'>
				<Button onClick={next} style={{ backgroundColor: "#042b61", borderColor: "white", color: "white" }}>
					Siguiente
				</Button>
			</Container>

>>>>>>> main
		</Form>
	);
};
export default BasicInformation;
