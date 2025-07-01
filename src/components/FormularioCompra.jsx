import { Form, Button, Row, Col } from 'react-bootstrap';

const FormularioCompra = () => {
  return (
    <>
      <h2>Registrar una nueva compra</h2>
      <Form>
        {/* Campo para el Producto */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Producto:</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Ej: Zapatillas" />
          </Col>
        </Form.Group>

        {/* Agrega aquí los demás campos que te pide el caso [cite: 69, 70] */}
        {/* Marca, Fecha, Motivo, Categoría, y la evaluación (responsable/impulsiva) */}

        <Button variant="primary" type="submit">
          Guardar Compra
        </Button>
      </Form>
    </>
  );
};

export default FormularioCompra;