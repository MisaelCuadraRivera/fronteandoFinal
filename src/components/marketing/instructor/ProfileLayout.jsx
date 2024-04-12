// import node module libraries
import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Container, Nav, Navbar } from 'react-bootstrap';

// import custom components
import ProfileCover from 'components/marketing/common/headers/ProfileCover';

// import routes file
import {
	DashboardMenu,
	AccountSettingsMenu
} from 'routes/marketing/InstructorDashboard';

// import media files
import Avatar1 from 'assets/images/avatar/avatar-1.jpg';

const ProfileLayout = (props) => {
	const userDataString = localStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : {};
	const avatarSrc = userData.avatar ? `data:image/jpeg;base64,${userData.avatar}` : Avatar1; // Esta es tu imagen en base64 o una predeterminada
	const utez_community = localStorage.getItem('utez_community');
	const location = useLocation();
    console.log('utez_community:', utez_community); // Añade esto para depurar

	
	const dashboardData = {
		avatar: avatarSrc, // Utiliza avatarSrc que ya tiene el manejo de base64 o imagen predeterminada
        name: userData.name || 'Nombre de Usuario',
        username: userData.username || 'correo@ejemplo.com',
		linkname: 'Crear curso',
		link: '/marketing/instructor/add-new-course/'
	};
	const showDashboardMenu = utez_community === 'administrativo' || utez_community === 'profesor';
    const showSettingsMenu = utez_community === 'estudiante' || utez_community === 'egresado' || utez_community === 'publico' || utez_community === 'administrativo' || utez_community === 'profesor';

	return (
		<Fragment>
			<section className="pt-5 pb-5">
				<Container>
					{/* User info */}
					<ProfileCover dashboardData={dashboardData} />
					                {/* Mostrar el botón de Crear curso si el usuario es administrativo o profesor */}
									{showDashboardMenu && (
                    <Row className="mb-3">
                        <Col className="text-end">
                            <Link to={dashboardData.link} className="btn btn-primary">
                                {dashboardData.linkname}
                            </Link>
                        </Col>
                    </Row>
                )}
	
					{/* Content */}
					<Row className="mt-0 mt-md-4">
						<Col lg={3} md={4} sm={12}>
							<Navbar
								expand="lg"
								className="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav"
							>
								<Link
									className="d-xl-none d-lg-none d-md-none text-inherit fw-bold fs-5 float-start py-1"
									to="#"
								>
									Menu
								</Link>
								<Navbar.Toggle
									aria-controls="basic-navbar-nav"
									className="p-0 focus-none border-0"
									label="Responsive Menu"
								>
									<span
										className="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary p-0 text-white float-end"
										data-bs-toggle="collapse"
										data-bs-target="#sidenav"
										aria-controls="sidenav"
										aria-expanded="false"
										aria-label="Toggle navigation"
									>
										<span className="fe fe-menu"></span>
									</span>
								</Navbar.Toggle>
	
								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="me-auto flex-column" as="ul">
										{showDashboardMenu && (
											<>
												<Nav.Item className="navbar-header" as="li">
													Dashboard
												</Nav.Item>
												{DashboardMenu.map((item, index) => (
													<Nav.Item
														as="li"
														key={index}
														className={`${item.link === location.pathname ? 'active' : ''}`}
													>
														<Link className="nav-link" to={item.link}>
															<i className={`fe fe-${item.icon} nav-icon`}></i>
															{item.title}
														</Link>
													</Nav.Item>
												))}
											</>
										)}
										{showSettingsMenu && (
											<>
												<Nav.Item className="navbar-header mt-4" as="li">
													Configuración
												</Nav.Item>
												{AccountSettingsMenu.map((item, index) => (
													<Nav.Item
														as="li"
														key={index}
														className={`${item.link === location.pathname ? 'active' : ''}`}
													>
														<Link className="nav-link" to={item.link}>
															<i className={`fe fe-${item.icon} nav-icon`}></i>
															{item.title}
														</Link>
													</Nav.Item>
												))}
											</>
										)}
									</Nav>
								</Navbar.Collapse>
							</Navbar>
						</Col>
	
						<Col lg={9} md={8} sm={12}>
							{props.children}
						</Col>
					</Row>
				</Container>
			</section>
		</Fragment>
	); 
}
export default ProfileLayout;