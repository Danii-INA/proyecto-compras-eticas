import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white text-center p-3 mt-auto">
      <Container>
        <p className="mb-0">
          &copy; {anioActual} - Danilo C. & Simón E. - Proyecto Final
        </p>
      </Container>
    </footer>
  );
};

export default Footer;