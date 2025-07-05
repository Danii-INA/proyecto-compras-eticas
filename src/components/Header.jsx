import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { FaMoneyBillWave } from 'react-icons/fa'; // Importo un icono para el logo

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <FaMoneyBillWave className="me-2" />
          Control de Compras Éticas
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;