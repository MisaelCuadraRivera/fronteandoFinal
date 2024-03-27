// import node module libraries
import { Card, Form, Button } from 'react-bootstrap';

// import custom components
import GKTagsInput from 'components/elements/tags/GKTagsInput';
import Icon from '@mdi/react';
import { mdiUpload } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';
const Settings = (props) => {
	const { previous } = props;

	return (
		<Form>
			{/* Card */}
			<Card className="mb-3  border-0">
				<Card.Header className="border-bottom px-4 py-3">
					<h4 className="mb-0">Requisitos</h4>
				</Card.Header>
				{/* Card body */}
				<Card.Body>
					<GKTagsInput  />
				</Card.Body>
			</Card>
			<div className="d-flex justify-content-between mb-22">
				{/* Button */}
				<Button variant="secondary" onClick={previous}>
				<Icon path={mdiArrowLeft} size={0.8} />{" "} Anterior
				</Button>
				<Button variant="danger">Mandar a revisión <Icon path={mdiUpload} size={0.7}/>  </Button>
			</div>
		</Form>
	);
};
export default Settings;
