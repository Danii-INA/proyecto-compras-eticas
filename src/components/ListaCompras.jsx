import React from 'react';
import { Table, Badge } from 'react-bootstrap';

// se recibe la lista de compras como un "prop" desde App.jsx
const ListaCompras = ({ compras }) => {

  // Si no hay compras, se muestra el siguiente mensaje.
  if (compras.length === 0) {
    return <p className="mt-4 text-center">Aún no has registrado ninguna compra.</p>;
  }

  return (
    // se utiliza una tabla de Bootstrap para que se vea ordenado.
    <Table striped bordered hover responsive className="mt-4">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Marca</th>
          <th>Fecha</th>
          <th>Categoría</th>
          <th>Evaluación</th>
          {/* Más adelante añadiré aquí una columna para las acciones (editar/eliminar) */}
        </tr>
      </thead>
      <tbody>
        {/* Hago un recorrido por el arreglo de compras para crear una fila por cada una. */}
        {/* La 'key' es un identificador único que React necesita para cada elemento de la lista. */}
        {compras.map((compra) => (
          <tr key={compra.id}>
            <td>{compra.producto}</td>
            <td>{compra.marca}</td>
            <td>{compra.fecha}</td>
            <td>{compra.categoria}</td>
            <td>
                {/* Uso un "Badge" para que la evaluación se vea más bonita. */}
                <Badge bg={compra.evaluacion === 'impulsiva' ? 'warning' : 'success'}>
                    {compra.evaluacion}
                </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListaCompras;