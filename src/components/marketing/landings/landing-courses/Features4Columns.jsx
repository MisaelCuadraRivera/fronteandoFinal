// Section : Features
// Style : Four Columns Features Section

// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';

// import custom components
import SectionHeadingCenter from 'components/marketing/common/section-headings/SectionHeadingCenter';
import FeatureTopIcon from 'components/marketing/common/features/FeatureTopIcon';

const Features4Columns = () => {
	const title = 'Desarrolla tus habilidades, más rápido';
	const subtitle = 'Por qué aprender con nosotros';
	const description = `Explora nuevas habilidades, profundiza en los temas que te interesan y aprende de expertos en tu área de interés.`;

	const features = [
		{
			id: 1,
			icon: 'settings',
			title: 'Aprende a tu propio ritmo',
			description: `No hay límites de tiempo. Aprende a tu propio ritmo y en tus propios términos.`
		},
		{
			id: 2,
			icon: 'user',
			title: 'Preparate para el futuro',
			description: `La tecnología avanza rápidamente. Mantente al día con las habilidades que necesitas.`
		},
		{
			id: 3,
			icon: 'award',
			title: 'Certificate',
			description: `Nuestros cursos te otorgan un certificado de finalización.`
		}
	];

	return (
		<section className="py-8 py-lg-18 bg-white">
			<Container>
				<SectionHeadingCenter
					title={title}
					description={description}
					subtitle={subtitle}
				/>
				<Row>
					{features.map((item, index) => {
						return (
							<Col lg={4} md={6} sm={12} key={index}>
								<FeatureTopIcon item={item} />
							</Col>
						);
					})}
				</Row>
			</Container>
		</section>
	);
};

export default Features4Columns;
