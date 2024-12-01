import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Row, Col, Image, Dropdown, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';


import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import DotBadge from 'components/elements/bootstrap/DotBadge';
import DarkLightMode from 'layouts/DarkLightMode';
import GKTippy from 'components/elements/tooltips/GKTippy';




const QuickMenu = () => {
	const isDesktop = useMediaQuery({
		query: '(min-width: 1224px)'
	});


	const handleLogout = () => {
		Swal.fire({
			title: '¿Estás seguro?',
			text: "Se cerrará tu sesión actual.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Cerrar Sesión',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				localStorage.clear(); // Elimina todos los elementos del localStorage
				window.location.href = '/'; // Redirige al usuario al inicio de sesión u otra página
			}
		});
	};

	const Notifications = () => {
		return (
			<SimpleBar style={{ maxHeight: '300px' }}>
				<ListGroup variant="flush">
					{NotificationList.map(function (item, index) {
						return (
							<ListGroup.Item
								className={index === 0 ? 'bg-light' : ''}
								key={index}
							>
								<Row>
									<Col>
										<Link className="text-body" to="#">
											<div className="d-flex">
												<Image
													src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png"
													alt=""
													className="avatar-md rounded-circle"
												/>
												<div className="ms-3">
													<h5 className="fw-bold mb-1">{item.sender}</h5>
													<p className="mb-3">{item.message}</p>
													<span className="fs-6 text-muted">
														<span>
															<span className="fe fe-thumbs-up text-success me-1"></span>
															{item.date}
														</span>
														<span className="ms-1">{item.time}</span>
													</span>
												</div>
											</div>
										</Link>
									</Col>
									<Col xs="auto" className="text-center me-2">
										<GKTippy content="Mark as unread">
											<Link to="#">
												<DotBadge bg="secondary"></DotBadge>
											</Link>
										</GKTippy>
									</Col>
								</Row>
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</SimpleBar>
		);
	};
	return (
		<Fragment>
			<DarkLightMode />
			<ListGroup
				as="ul"
				bsPrefix="navbar-nav"
				className="navbar-right-wrap ms-2 d-flex nav-top-wrap"
			>

				<Dropdown as="li" className="ms-1">
					<Dropdown.Toggle
						as="a"
						bsPrefix=" "
						className="rounded-circle"
						id="dropdownUser"
					>
						<div className="avatar avatar-md avatar-indicators avatar-online">
							<Image alt="avatar" src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png" className="rounded-circle" />
						</div>
					</Dropdown.Toggle>
					<Dropdown.Menu
						show={isDesktop ? true : false}
						className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
						aria-labelledby="dropdownUser"
						align="end"
					>
						<Dropdown.Item className="mt-3">
							<div className="d-flex">
								<div className="avatar avatar-md avatar-indicators avatar-online">
									<Image
										alt="avatar"
										src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png"

										className="rounded-circle"
									/>
								</div>
								<div className="ms-3 lh-1">
									<h5 className="mb-1">Administrador</h5>
									<p className="mb-0 text-muted">admin@utez.edu.mx</p>
								</div>
							</div>
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Divider />
						<Dropdown.Item as="div" className="mb-3">
							<div className="dropdown-item" onClick={handleLogout}>
								<i className="fe fe-power me-2"></i> Cerrar Sesión
							</div>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</ListGroup>
		</Fragment>
	);
};

export default QuickMenu;
