import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Outlet } from 'react-router-dom';

function MenuPublico() {

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink className="navbar-brand" end // ✅ Usando 'end'
                        to="/">Culinária Compartilhada</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" end // ✅ Removida classe 'active' estática
                                to="/">Home</NavLink>
                            <NavLink className="nav-link" end // ✅ Removida classe 'active' estática e usando 'end'
                                to="/sobre">Sobre...</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav> {/* Não é necessário 'me-auto' aqui se está em justify-content-end */}
                            <NavLink className="nav-link" end // ✅ Removida classe 'active' estática e usando 'end'
                                to="/login">Login</NavLink>
                            <NavLink className="nav-link" end // ✅ Removida classe 'active' estática e usando 'end'
                                to="/cadastro">Cadastro</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default MenuPublico;