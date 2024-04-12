// import node module libraries
import { Fragment, useState } from 'react';
import { Form, FormControl, InputGroup,Button } from 'react-bootstrap';



const AddNewCategoryPopup = () => {
	const parentOptions = [
		{ value: '', label: 'Select' },
		{ value: 'ocean', label: 'Course' },
		{ value: 'blue', label: 'Tutorial' },
		{ value: 'purple', label: 'Workshop' },
		{ value: 'red', label: 'Company' }
	];
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
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
			</Form>
		</Fragment>
	);
};

export default AddNewCategoryPopup;
