import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import FormularioCompra from './components/FormularioCompra';
import ListaCompras from './components/ListaCompras'; // Lo importo aquí

function App() {
  const [compras, setCompras] = useState(() => {
    // Intento cargar las compras que ya tenía guardadas en Local Storage.
    const comprasGuardadas = localStorage.getItem('compras');
    return comprasGuardadas ? JSON.parse(comprasGuardadas) : [];
  });


  // Si es 'null', no estoy editando nada. Si tiene un objeto, estoy en modo edición.
  const [compraAEditar, setCompraAEditar] = useState(null);


  useEffect(() => {
    // Guardo en Local Storage cada vez que la lista de 'compras' se actualice.
    localStorage.setItem('compras', JSON.stringify(compras));
  }, [compras]);
// Mi nueva función para eliminar una compra por su ID.
  const eliminarCompra = (id) => {
    // Confirmo con el usuario antes de borrar.
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta compra?");
    if (confirmar) {
      // Uso 'filter' para crear un nuevo arreglo con todas las compras EXCEPTO la que tiene el id que quiero borrar.
      const comprasActualizadas = compras.filter(compra => compra.id !== id);
      setCompras(comprasActualizadas);
    }
  };

  // Nueva función para actualizar una compra existente.
  const actualizarCompra = (compraActualizada) => {
    // Uso 'map' para crear un nuevo arreglo.
    // Si el id de la compra coincide con el que estoy actualizando, devuelvo la versión nueva.
    // Si no, devuelvo la compra como estaba.
    const comprasActualizadas = compras.map(compra => 
      compra.id === compraActualizada.id ? compraActualizada : compra
    );
    setCompras(comprasActualizadas);
    // Limpio el estado de edición para volver al modo normal.
    setCompraAEditar(null);
  };


  const agregarCompra = (compra) => {
    // Añado un id único a la nueva compra antes de guardarla en la lista.
    const nuevaCompra = { ...compra, id: Date.now() };
    setCompras([...compras, nuevaCompra]);
  };

 return (
    <Container className="mt-5">
      <h1>Control de Compras Éticas</h1>
      <hr />
      {/* Ahora le paso al formulario la lógica de edición */}
      <FormularioCompra 
        onAgregarCompra={agregarCompra} 
        onActualizarCompra={actualizarCompra}
        compraAEditar={compraAEditar}
        setCompraAEditar={setCompraAEditar}
      />

      <hr />
      <h2 className='mt-4'>Mis Compras Registradas</h2>
      {/* Ahora le paso a la lista la función que activa el modo edición */}
      <ListaCompras 
        compras={compras} 
        onEliminarCompra={eliminarCompra}
        onSeleccionarCompra={setCompraAEditar}
      />
    </Container>
  );
}

export default App;