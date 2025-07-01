import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import FormularioCompra from './components/FormularioCompra'; // Importa el componente

// src/App.jsx
function App() {
  return (
    <Container className="mt-5">
      <h1>Control de Compras Éticas</h1>
      {/* Configuración de Git corregida */}
      <hr />
      <FormularioCompra />
    </Container>
  )
}

export default App