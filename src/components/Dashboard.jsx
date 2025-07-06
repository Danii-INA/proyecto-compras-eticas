import React from 'react';
import { Card, Col, Row, ProgressBar, Alert } from 'react-bootstrap';
import { FaShoppingCart, FaDollarSign, FaExclamationTriangle } from 'react-icons/fa';

// El dashboard recibe la lista de compras para poder calcular las estadísticas
const Dashboard = ({ compras }) => {

  // Calculo el total gastado sumando todos los precios
  const totalGastado = compras.reduce((sum, compra) => sum + parseFloat(compra.precio || 0), 0);
  // Se comprueba cuantas compras son impulsivas y cuantas responsables
  const comprasImpulsivas = compras.filter(c => c.evaluacion === 'impulsiva').length;
  const comprasResponsables = compras.filter(c => c.evaluacion === 'responsable').length;
  const totalCompras = compras.length;
  // se calcula el porcentaje para la barra de progreso
  const porcentajeResponsable = totalCompras > 0 ? (comprasResponsables / totalCompras) * 100 : 0;

  
  // ---NUEVA LÓGICA PARA LAS ALERTAS Y SUGERENCIAS -----------------------------------------------------------------------------------------------------------------------
  const umbralGasto = 200000; // Defino un límite de gasto de $200.000
  let mensajeAlerta = null; // Por defecto, no hay ningún mensaje que mostrar.

  if (totalGastado > umbralGasto) {
    // Si se supera el limite, se crea un mensaje de alerta.
    mensajeAlerta = {
      tipo: 'danger', // El color de la alerta (rojo)
      titulo: 'Alerta de Sobreconsumo',
      texto: `Has superado tu limite de gasto de ${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(umbralGasto)}.`
    };
  } else if (totalCompras > 0 && comprasImpulsivas > comprasResponsables) {
    // Si no hay sobreconsumo, pero las compras impulsivas son mayoría, se muestra una sugerencia.
    mensajeAlerta = {
      tipo: 'warning', // El color de la alerta (amarillo)
      titulo: 'Sugerencia de Mejora',
      texto: 'La mayoría de tus compras recientes han sido impulsivas. ¡Considera planificar mejor próximos gastos para mejorar tus hábitos!'
    };
  }
  // --------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="mt-4">
      <h2 className='mb-3'>Dashboard de Consumo</h2>
      <Row>
        <Col md={4} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title><FaDollarSign className="me-2" />Total Gastado</Card.Title>
              <Card.Text className="fs-4 fw-bold">
                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(totalGastado)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
             <Card.Title><FaShoppingCart className="me-2" />Total de Compras</Card.Title>
              <Card.Text className="fs-4 fw-bold">
                {totalCompras}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title><FaExclamationTriangle className="me-2" />Compras Impulsivas</Card.Title>
              <Card.Text className="fs-4 fw-bold text-warning">
                {comprasImpulsivas}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Hábitos de Compra</Card.Title>
              <ProgressBar className="mt-3" style={{height: '25px'}}>
                <ProgressBar 
                  variant="success" 
                  now={porcentajeResponsable} 
                  key={1} 
                  label={`Responsables (${comprasResponsables})`}
                />
                <ProgressBar 
                  variant="warning" 
                  now={100 - porcentajeResponsable} 
                  key={2} 
                  label={`Impulsivas (${comprasImpulsivas})`}
                />
              </ProgressBar>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  
        
    {/* --- AQUÍ SE MUESTRA LA ALERTA (SOLO SI EXISTE) --- */}
      {mensajeAlerta && (
        <Alert variant={mensajeAlerta.tipo} className="mt-4">
          <Alert.Heading>{mensajeAlerta.titulo}</Alert.Heading>
          <p>{mensajeAlerta.texto}</p>
        </Alert>
      )}
      {/* ---------------------------------------------------- */}
    </div>
  );
};

export default Dashboard;