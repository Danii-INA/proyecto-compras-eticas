import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const FormularioCompra = ({ onAgregarCompra }) => {
  // estado inicial para un nuevo objeto 'compra'.
  const [compra, setCompra] = useState({
    producto: '',
    marca: '',
    fecha: '',
    categoria: '',
    motivo: '',
    evaluacion: 'responsable'
  });

  // Cada vez que escribo en un input, se actualiza el estado.
  const handleChange = (e) => {
    setCompra({
      ...compra,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando se envia el formulario, se evita que se recargue la página
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!compra.producto || !compra.fecha) {
      alert("Producto y Fecha son obligatorios");
      return;
    }
    onAgregarCompra(compra);
    
    // Limpia el formulario para poder agregar una nueva compra fácilmente.
    setCompra({
      producto: '',
      marca: '',
      fecha: '',
      categoria: '',
      motivo: '',
      evaluacion: 'responsable'
    });
  };

  return (
    <>
      <h2>Registrar una nueva compra</h2>
      <Form onSubmit={handleSubmit}>
        {/* Producto */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Producto:</Form.Label>
          <Col sm={10}><Form.Control type="text" name="producto" value={compra.producto} onChange={handleChange} /></Col>
        </Form.Group>

        {/* Marca */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Marca:</Form.Label>
          <Col sm={10}><Form.Control type="text" name="marca" value={compra.marca} onChange={handleChange} /></Col>
        </Form.Group>
        
        {/* Fecha */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Fecha:</Form.Label>
          <Col sm={10}><Form.Control type="date" name="fecha" value={compra.fecha} onChange={handleChange} /></Col>
        </Form.Group>

        {/* Categoría */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Categoría:</Form.Label>
          <Col sm={10}><Form.Control type="text" name="categoria" placeholder="Ej: Ropa, Tecnología..." value={compra.categoria} onChange={handleChange} /></Col>
        </Form.Group>

        {/* Motivo */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Motivo:</Form.Label>
          <Col sm={10}><Form.Control as="textarea" rows={2} name="motivo" value={compra.motivo} onChange={handleChange} /></Col>
        </Form.Group>

        {/* Evaluación (la que extrañabas) */}
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Evaluación:</Form.Label>
            <Col sm={10}>
                <Form.Select name="evaluacion" value={compra.evaluacion} onChange={handleChange}>
                    <option value="responsable">Compra Responsable</option>
                    <option value="impulsiva">Compra Impulsiva</option>
                </Form.Select>
            </Col>
        </Form.Group>

        <Button variant="primary" type="submit">Guardar Compra</Button>
      </Form>
    </>
  );
};

export default FormularioCompra;