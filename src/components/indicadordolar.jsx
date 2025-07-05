import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const IndicadorDolar = () => {
  // se agrega un estado para guardar el valor del dólar que se reciba de la API.
  const [valorDolar, setValorDolar] = useState(null);
  // se añade un estado para mostrar un mensaje de "cargando" mientras se espera la respuesta.
  const [cargando, setCargando] = useState(true);

  // se usa useEffect para hacer la llamada a la API solo una vez, cuando el componente se monta.
  useEffect(() => {
    // Esta es la URL de la API pública para el dólar.
    const urlApi = 'https://mindicador.cl/api/dolar';

    fetch(urlApi)
      .then(response => response.json())
      .then(data => {
        // La API entrega  datos,se necesita solo el primer valor.
        setValorDolar(data.serie[0].valor);
      })
      .catch(error => {
        // Si hay un error, se muestra en la consola.
        console.error("Error al obtener el valor del dólar:", error);
      })
      .finally(() => {
        // Ya sea con éxito o con error, se muestra el mensaje de "cargando".
        setCargando(false);
      });
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez.

  return (
    <Card className="mt-4 text-center" bg="light">
      <Card.Body>
        <Card.Title>Valor del Dólar Hoy</Card.Title>
        {cargando ? (
          <Card.Text>Cargando...</Card.Text>
        ) : (
          <Card.Text className="fs-4 fw-bold text-success">
            {/* se Formatea el número como moneda para que se vea bien */}
            {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valorDolar)}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default IndicadorDolar;