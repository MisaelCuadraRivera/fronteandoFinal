// import node module libraries
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import profile layout wrapper
import ProfileLayout from './ProfileLayout';

// import media files
import SurveyImg from 'assets/images/svg/survey-img.svg';

const Quiz = () => {
	return (
		<ProfileLayout>
			<Card className="border-0">
				<Card.Body className="p-10">
					<div className="text-center">
						<img src={SurveyImg} alt="" className="img-fluid" />
						<div className="px-lg-18">
							<h1>Bienvenido al Examen Grindr</h1>
							<p className="mb-0">
								Descubre que tanto conocimiento tienes sobre la aplicacion de Grindr.
							</p>
							<Link
								to="/marketing/student/quiz/start/"
								className="btn btn-primary mt-4"
							>
								Empezar tu Examen
							</Link>
						</div>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default Quiz;
