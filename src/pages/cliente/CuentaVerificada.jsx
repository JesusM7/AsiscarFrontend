import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginCliente.css'; // Reutilizamos estilos del login

function CuentaVerificada() {
  const [contador, setContador] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalo = setInterval(() => {
      setContador((prev) => prev - 1);
    }, 1000);

    const redireccion = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => {
      clearInterval(intervalo);
      clearTimeout(redireccion);
    };
  }, [navigate]);

  return (
    <div className="login-cliente">
      <h2>✅ Cuenta verificada</h2>
      <p>Tu cuenta ha sido verificada con éxito.</p>
      <p>Redirigiendo al login en <strong>{contador}</strong> segundos...</p>
    </div>
  );
}

export default CuentaVerificada;