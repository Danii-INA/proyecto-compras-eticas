import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

// Ahora recibo más props para manejar la lógica de actualización.
const FormularioCompra = ({ onAgregarCompra, onActualizarCompra, compraAEditar, setCompraAEditar }) => {
  
  // Mi estado inicial para el objeto 'compra'.
  const [compra, setCompra] = useState({
    producto: '', marca: '', fecha: '', categoria: '', motivo: '', evaluacion: 'responsable'
  });

  // Este useEffect se activa cuando 'compraAEditar' cambia.
  useEffect(() => {
    if (compraAEditar) {
      // Si hay una compra para editar, relleno el formulario con sus datos.
      setCompra(compraAEditar);
    } else {
      // Si no, limpio el formulario.
      setCompra({
        producto: '', marca: '', fecha: '', categoria: '', motivo: '', evaluacion: 'responsable'
      });
    }
  }, [compraAEditar]);

  // Cada vez que escribo en un input, actualizo mi estado.
  const handleChange = (e) => {
    setCompra({ ...compra, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!compra.producto || !compra.fecha) {
      alert("Producto y Fecha son obligatorios");
      return;
    }

    if (compraAEditar) {
      // Si estoy en modo edición, llamo a la función de actualizar.
      onActualizarCompra(compra);
    } else {
      // Si no, llamo a la función de agregar una nueva.
      onAgregarCompra(compra);
    }
  };

  return (
    <>
      {/* El título cambia dinámicamente */}
      <h2>{compraAEditar ? 'Editar Compra' : 'Registrar una nueva compra'}</h2>
      <Form onSubmit={handleSubmit}>
        
        {/* Aquí van todos los campos del formulario */}
        <Form.Group as={Row} className="mb-3"><Form.Label column sm={2}>Producto:</Form.Label><Col sm={10}><Form.Control type="text" name="producto" value={compra.producto} onChange={handleChange} /></Col></Form.Group>
        <Form.Group as={Row} className="mb-3"><Form.Label column sm={2}>Marca:</Form.Label><Col sm={10}><Form.Control type="text" name="marca" value={compra.marca} onChange={handleChange} /></Col></Form.Group>
        <Form.Group as={Row} className="mb-3"><Form.Label column sm={2}>Fecha:</Form.Label><Col sm={10}><Form.Control type="date" name="fecha" value={compra.fecha} onChange={handleChange} /></Col></Form.Group>
        <Form.Group as={Row} className="mb-3"><Form.Label column sm={2}>Categoría:</Form.Label><Col sm={10}><Form.Control type="text" name="categoria" placeholder="Ej: Ropa, Tecnología..." value={compra.categoria} onChange={handleChange} /></Col></Form.Group>
        <Form.Group as={Row} className="mb-3"><Form.Label column sm={2}>Motivo:</Form.Label><Col sm={10}><Form.Control as="textarea" rows={2} name="motivo" value={compra.motivo} onChange={handleChange} /></Col></Form.Group>
        <Form.Group as={Row} className="mb-3"><Form.Label column sm={2}>Evaluación:</Form.Label><Col sm={10}><Form.Select name="evaluacion" value={compra.evaluacion} onChange={handleChange}><option value="responsable">Compra Responsable</option><option value="impulsiva">Compra Impulsiva</option></Form.Select></Col></Form.Group>

        {/* Los botones cambian dinámicamente */}
        <Button variant={compraAEditar ? "warning" : "primary"} type="submit">
          {compraAEditar ? 'Actualizar Compra' : 'Guardar Compra'}
        </Button>

        {/* Si estoy editando, muestro un botón para cancelar */}
        {compraAEditar && (
          <Button variant="secondary" className="ms-2" onClick={() => setCompraAEditar(null)}>
            Cancelar
          </Button>
        )}
      </Form>
    </>
  );
};

export default FormularioCompra;