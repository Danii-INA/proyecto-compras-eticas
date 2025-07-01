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

  useEffect(() => {
    // Guardo en Local Storage cada vez que mi lista de 'compras' cambia.
    localStorage.setItem('compras', JSON.stringify(compras));
  }, [compras]);

  const agregarCompra = (compra) => {
    // Añado un id único a la nueva compra antes de guardarla en la lista.
    const nuevaCompra = { ...compra, id: Date.now() };
    setCompras([...compras, nuevaCompra]);
  };

  return (
    <Container className="mt-5">
      <h1>Control de Compras Éticas</h1>
      <hr />
      <FormularioCompra onAgregarCompra={agregarCompra} />

      {/* Aquí abajo renderizo mi nuevo componente de lista. */}
      {/* Le paso mi estado 'compras' para que sepa qué mostrar. */}
      <hr />
      <h2 className='mt-4'>Mis Compras Registradas</h2>
      <ListaCompras compras={compras} />
    </Container>
  );
}

export default App;