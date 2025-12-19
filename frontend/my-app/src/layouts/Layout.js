import React from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Container
} from "reactstrap";
import { NavLink as RouterNavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Container className="d-flex justify-content-between align-items-center">
          {/* Left: Dashboard */}
          <NavbarBrand tag={RouterNavLink} to="/dashboard">
            Dashboard
          </NavbarBrand>

          {/* Center: Tabs */}
          <Nav className="mx-auto" navbar>
            <NavItem>
              <RouterNavLink className="nav-link" to="/profile">
                Profile
              </RouterNavLink>
            </NavItem>
            <NavItem>
              <RouterNavLink className="nav-link" to="/topics">
                Topics
              </RouterNavLink>
            </NavItem>
            <NavItem>
              <RouterNavLink className="nav-link" to="/progress">
                Progress
              </RouterNavLink>
            </NavItem>
          </Nav>

          {/* Right: Logout */}
          <Button color="danger" onClick={()=> logout()}>
            Logout
          </Button>
        </Container>
      </Navbar>

      {/* Protected page content */}
      <main style={{ padding: "20px" }}>
        <Outlet /> {/* renders the child route */}
      </main>
    </div>
  );
};

export default Layout;