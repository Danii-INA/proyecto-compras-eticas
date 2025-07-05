import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

// Mis Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import IndicadorDolar from './components/IndicadorDolar';
import FormularioCompra from './components/FormularioCompra';
import ListaCompras from './components/ListaCompras';

// Estilos personalizados
import './App.css'; 

function App() {
  const [compras, setCompras] = useState(() => {
    // Intento cargar las compras que ya tenía guardadas en Local Storage.
    const comprasGuardadas = localStorage.getItem('compras');
    return comprasGuardadas ? JSON.parse(comprasGuardadas) : [];
  });

  // Si es 'null', no estoy editando nada. Si tiene un objeto, estoy en modo edición.
  const [compraAEditar, setCompraAEditar] = useState(null);

  // Guardo en Local Storage cada vez que la lista de 'compras' se actualice.
  useEffect(() => {
    localStorage.setItem('compras', JSON.stringify(compras));
  }, [compras]);

  // Mi función para agregar una nueva compra.
  const agregarCompra = (compra) => {
    const nuevaCompra = { ...compra, id: Date.now() };
    setCompras([...compras, nuevaCompra]);
  };

  // Mi función para eliminar una compra por su ID.
  const eliminarCompra = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta compra?");
    if (confirmar) {
      const comprasActualizadas = compras.filter(compra => compra.id !== id);
      setCompras(comprasActualizadas);
    }
  };

  // Mi función para actualizar una compra existente.
  const actualizarCompra = (compraActualizada) => {
    const comprasActualizadas = compras.map(compra => 
      compra.id === compraActualizada.id ? compraActualizada : compra
    );
    setCompras(comprasActualizadas);
    setCompraAEditar(null);
  };

  return (
    // Uso un Fragment <> para envolver todo, ya que mi CSS de Flexbox lo necesita.
    <>
      <Header />
      <Container className="my-5 flex-grow-1">
        
        {/* --- SECCIÓN SUPERIOR: Ocupa todo el ancho --- */}
        <Dashboard compras={compras} />
        <IndicadorDolar />
        <hr className="my-4"/>

        {/* --- SECCIÓN DE DOS COLUMNAS --- */}
        <Row>
          {/* COLUMNA IZQUIERDA: Formulario */}
          <Col lg={5}>
            <h2 className='h4 mb-3'>Registrar o Editar Compra</h2>
            <FormularioCompra 
              onAgregarCompra={agregarCompra} 
              onActualizarCompra={actualizarCompra}
              compraAEditar={compraAEditar}
              setCompraAEditar={setCompraAEditar}
            />
          </Col>

          {/* COLUMNA DERECHA: Lista de Compras */}
          <Col lg={7}>
            <h2 className='h4 mb-3'>Mis Compras Registradas</h2>
            <ListaCompras 
              compras={compras} 
              onEliminarCompra={eliminarCompra}
              onSeleccionarCompra={setCompraAEditar}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default App;