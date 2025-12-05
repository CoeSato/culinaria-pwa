import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';
import { getUsuario, logout } from '../seguranca/Autenticacao';

function MenuPrivado() {

    const usuario = getUsuario();

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink className="navbar-brand" end 
                        to="/privado">Culinária Compartilhada</NavLink> {/* ✅ Usando 'end' em vez de 'exact="true"' em React Router v6 */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link active" end
                                to="/privado">Home</NavLink>
                            
                            {/* 🛑 MELHORIA: Adicionando Receitas à navegação principal */}
                            <NavLink className="nav-link" to="receitas">Receitas</NavLink>

                            {usuario && (
                                <NavDropdown title="Manutenções" id="basic-nav-dropdown">
                                    <NavLink className="dropdown-item" to="cozinheiros">Cozinheiros</NavLink>
                                    <NavLink className="dropdown-item" to="ingredientes">Ingredientes</NavLink>
                                    <NavLink className="dropdown-item" to="receitas">Receitas</NavLink>
                                </NavDropdown>
                            )}
                            <NavLink className="nav-link" to="sobre">Sobre...</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={usuario ? "Usuário: " + usuario.nome : "Usuário"} id="basic-nav-dropdown">
                            <NavLink className="dropdown-item" to="perfil">
                                Editar Dados
                            </NavLink>
                            
                            {/* 🛑 MELHORIA: Simplificando a lógica, pois o usuário SEMPRE existe aqui */}
                            <NavLink 
                                className="dropdown-item" 
                                to="/" 
                                onClick={() => logout()}>
                                Logout
                            </NavLink>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default MenuPrivado;