import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import FormularioCompra from './components/FormularioCompra'; // Importa el componente

function App() {

  return (
    <Container className="mt-5">
      <h1>Control de Compras Éticas</h1>
      <hr />
      <FormularioCompra /> {/* Usa el componente aquí */}
    </Container>
  )
}

export default App