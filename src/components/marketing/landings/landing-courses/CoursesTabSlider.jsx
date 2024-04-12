// import node module libraries
import { Row, Col, Nav, Tab, Card } from 'react-bootstrap';

// import custom components
import CourseSlider from 'components/marketing/pages/courses/CourseSlider';

const CoursesTabSlider = () => {
	return (
		<Row>
			<Col md={12}>
				<Tab.Container defaultActiveKey="all">
					<Card className="bg-transparent shadow-none ">
						<Card.Body className="p-0">
							<Tab.Content>
								<Tab.Pane eventKey="all" className="pb-4 p-4 ps-0 pe-0">
									<CourseSlider />
								</Tab.Pane>
								<Tab.Pane eventKey="design" className="pb-4 p-4 ps-0 pe-0">
									<CourseSlider />
								</Tab.Pane>
								<Tab.Pane eventKey="javascript" className="pb-4 p-4 ps-0 pe-0">
									<CourseSlider category="javascript" />
								</Tab.Pane>
								<Tab.Pane
									eventKey="webdevelopment"
									className="pb-4 p-4 ps-0 pe-0"
								>
									<CourseSlider />
								</Tab.Pane>
							</Tab.Content>
						</Card.Body>
					</Card>
				</Tab.Container>
			</Col>
		</Row>
	);
};
export default CoursesTabSlider;
