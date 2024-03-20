// import node module libraries
import { Fragment } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

// import custom components
import ReactQuillEditor from 'components/elements/editor/ReactQuillEditor';
import { FormSelect } from 'components/elements/form-select/FormSelect';

const AddNewCategoryPopup = () => {
	const parentOptions = [
		{ value: '', label: 'Select' },
		{ value: 'ocean', label: 'Course' },
		{ value: 'blue', label: 'Tutorial' },
		{ value: 'purple', label: 'Workshop' },
		{ value: 'red', label: 'Company' }
	];

	const initialValue = `<h4>Esto es un ejemplo</h4>`;

	const onChange = () => {
		console.log('onChange was called!');
	};

	return (
		<Fragment>
			{/*  Form  */}
			<Form>
				{/* Title  */}
				<Form.Group className="mb-3">
					<Form.Label>Titulo</Form.Label>
					<Form.Control
						type="text"
						placeholder="Escribe una categoria"
						id="category-name"
					/>
					<Form.Text className="text-muted">
						La categoria debe de tener un nombre unico
					</Form.Text>
				</Form.Group>

				{/*   Slug  */}
				<Form.Group className="mb-3">
					<Form.Label>identificador</Form.Label>
					<InputGroup className="mb-3">
						<InputGroup.Text id="basic-addon3">
							https://ejemplo.com/
						</InputGroup.Text>
						<FormControl
							id="basic-url"
							aria-describedby="basic-addon3"
							placeholder="contaduria"
						/>
					</InputGroup>
					<Form.Text className="text-muted">
						El campo debe de tener un valor unico
					</Form.Text>
				</Form.Group>

				{/* Parent  */}
				<Form.Group className="mb-3">
					<Form.Label>Categoria Padre</Form.Label>
					<FormSelect options={parentOptions} />
				</Form.Group>

				{/*  Editor  */}
				<Form.Group className="mb-3">
					<ReactQuillEditor initialValue={initialValue} />
				</Form.Group>

				{/* Parent  */}
				<Form.Group className="mb-3">
					<Form.Label>Enabled</Form.Label>
					<Form.Check
						type="checkbox"
						defaultChecked
						label=""
						className=" form-switch"
						onChange={onChange}
					/>
				</Form.Group>
			</Form>
		</Fragment>
	);
};

export default AddNewCategoryPopup;
