import React from 'react';
import { Table, Badge } from 'react-bootstrap';
    // Ahora se agrega también la función 'onEliminarCompra' como prop.
const ListaCompras = ({ compras, onEliminarCompra }) => {
  // ... (tu if de si no hay compras)
  // Si no hay compras, se muestra el siguiente mensaje.
  if (compras.length === 0) {
    return <p className="mt-4 text-center">Aún no has registrado ninguna compra.</p>;
  }

  return (
    <Table striped bordered hover responsive className="mt-4">
      <thead>
        <tr>
          {/* ... (tus otras columnas) ... */}
          <th>Evaluación</th>
          <th>Acciones</th> {/* Añado la nueva columna */}
        </tr>
      </thead>
      <tbody>
        {compras.map((compra) => (
          <tr key={compra.id}>
            {/* ... (tus otros <td>) ... */}
            <td>
                <Badge bg={compra.evaluacion === 'impulsiva' ? 'warning' : 'success'}>
                    {compra.evaluacion}
                </Badge>
            </td>
            <td>
              {/* Mi nuevo botón de eliminar. Al hacerle clic, llama a la función que recibí con el id de esta compra. */}
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