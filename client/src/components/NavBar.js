import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { NavLink, Link } from "react-router-dom";
import AuthConsumer from "../hooks/useAuth";

const NavBar = () => {
  const [{ isAuth, isAdmin }] = AuthConsumer();

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Link className="navbar-brand" to="/">
          Tiendazon
        </Link>
        <Nav className="me-auto">
          <NavLink className="nav-link" to="/">
            Inicio
          </NavLink>
          {isAdmin && (
            <>
              <NavLink className="nav-link" to="/categorias">
                Gestión categorías
              </NavLink>
              <NavLink className="nav-link" to="/productos">
                Gestión productos
              </NavLink>
            </>
          )}

          {!isAuth && (
            <>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link" to="/registro">
                Registro
              </NavLink>
            </>
          )}
          {isAuth && (
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
