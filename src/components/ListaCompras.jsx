import React from 'react';
// Asegúrate de que Button esté importado aquí
import { Table, Badge, Button } from 'react-bootstrap';

// Ahora también recibo 'onSeleccionarCompra' para poder editar.
const ListaCompras = ({ compras, onEliminarCompra, onSeleccionarCompra }) => {

  // Si no hay compras, muestro un mensaje.
  if (compras.length === 0) {
    return <p className="mt-4 text-center">Aún no has registrado ninguna compra.</p>;
  }

  return (
    <Table striped bordered hover responsive className="mt-4">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Marca</th>
          <th>Fecha</th>
          <th>Categoría</th>
          <th>Evaluación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {compras.map((compra) => (
          <tr key={compra.id}>
            <td>{compra.producto}</td>
            <td>{compra.marca}</td>
            <td>{compra.fecha}</td>
            <td>{compra.categoria}</td>
            <td>
                <Badge bg={compra.evaluacion === 'impulsiva' ? 'warning' : 'success'}>
                    {compra.evaluacion}
                </Badge>
            </td>
            <td>
              {/* Mi nuevo botón de Editar */}
              <Button 
                variant="warning" 
                size="sm" 
                className="me-2"
                onClick={() => onSeleccionarCompra(compra)}
              >
                Editar
              </Button>
              <Button variant="danger" size="sm" onClick={() => onEliminarCompra(compra.id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListaCompras;