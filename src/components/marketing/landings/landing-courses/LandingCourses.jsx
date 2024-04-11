// import node module libraries
import { Fragment } from 'react';

// import custom components
import LogosTopHeading from 'components/marketing/common/clientlogos/LogosTopHeading';
import CTA2Buttons from 'components/marketing/common/call-to-action/CTA2Buttons';

// import sub components
import Features4Columns from './Features4Columns';
import BrowseCategories from './BrowseCategories';
import HeroTyped from './HeroTyped';


// import layouts
import NavbarDefault from 'layouts/marketing/navbars/NavbarDefault';
import FooterWithLinks from 'layouts/marketing/footers/FooterWithLinks';

// import required data files
import LogoList2 from 'data/marketing/clientlogos/LogoList2';
import LogoList1 from 'data/marketing/clientlogos/LogoList1';

const LandingCourses = () => {
	return (
		<Fragment>
			{/* Default Navbar */}
			<NavbarDefault />

			<main>
				{/* Page Content */}
				<HeroTyped />

				{/* Browse Categories Section  */}
				<BrowseCategories />

				{/* Why learn with geeks */}
				<Features4Columns />

				{/*  Featured in section */}
				<LogosTopHeading title="NUESTROS CLIENTES" logos={LogoList1} />


				<hr className="my-0" />




				{/*  CTA section */}
				<CTA2Buttons
					title="Unete a la comunidad de halcones de la UTEZ"
					description="Donde puedes encontrar cursos para resolver cualquier duda de los temas de tu carrera."
					btntext1="Inicia Sesion"
					btnlink1="/authentication/sign-in"
					btntext2="Registrate"
					btnlink2="/authentication/sign-up"
				/>
			</main>

			{/* Footer section */}
			<FooterWithLinks />
		</Fragment>
	);
};
export default LandingCourses;
