import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Navbar, Nav, Container } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import Logo from 'assets/images/brand/logo/Logo-utez.png';
// Dentro de NavbarDefault.jsx u otro archivo relevante
import DarkLightMode from 'layouts/DarkLightMode';



const NavbarDefault = ({ headerstyle }) => {
    const [expandedMenu, setExpandedMenu] = useState(false);
    const [user, setUser] = useState(null);
    const [dashboardLink, setDashboardLink] = useState('/');  // Estado para dashboardLink

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    id: decoded.id,
                    email: decoded.email,
                    role: decoded.utez_community,
                    isAuthenticated: true
                });

                switch (decoded.utez_community) {
                    case 'profesor':
                        setDashboardLink('/marketing/instructor/dashboard/');
                        break;
                    case 'estudiante':
                    case 'egresado':
                    case 'publico':
                        setDashboardLink('/marketing/student/dashboard/');
                        break;
                    default:
                        console.error('Rol no reconocido o no autorizado para acceder a dashboards.');
                        break;
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return (
        <Fragment>
            <Navbar
                onToggle={(collapsed) => setExpandedMenu(collapsed)}
                expanded={expandedMenu}
                expand="lg"
                className="navbar p-2 navbar-default py-2"
            >
                <Container fluid className="px-0 ps-2">
                    <Navbar.Brand as={Link} to="/" >
                        <Image src={Logo} alt="logo UTEZ" className='mx-auto' />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <span className="icon-bar top-bar mt-0"></span>
                        <span className="icon-bar middle-bar"></span>
                        <span className="icon-bar bottom-bar"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        
                        <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
                            <DarkLightMode className="mt-2 me-2" />
                            {user?.isAuthenticated ? (
                                <>
                                    <Nav.Link as={Link} to={dashboardLink} className="btn" style={{paddingTop:"13px", paddingBottom:"10px"}}>Dashboard</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/authentication/sign-in" className="btn shadow-sm btn-white me-2" style={{paddingTop:"13px", paddingBottom:"10px"}}>
                                        Iniciar sesión
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/authentication/sign-up" className="btn shadow-sm" style={{paddingTop:"13px", paddingBottom:"10px"}}>
                                        Registrarme
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};

NavbarDefault.propTypes = {
    headerstyle: PropTypes.string
};

NavbarDefault.defaultProps = {
    headerstyle: 'navbar-default'
};

export default NavbarDefault;
