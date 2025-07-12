import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginCliente.css';

function RegistroExitoso() {
  const [segundos, setSegundos] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos((prev) => prev - 1);
    }, 1000);

    // Redirigir cuando llega a 0
    const redireccion = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => {
      clearInterval(intervalo);
      clearTimeout(redireccion);
    };
  }, [navigate]);

  return (
    <div className="registro-exitoso">
      <h2>✅ ¡Registro exitoso!</h2>
      <p>Hemos enviado un enlace de verificación a tu correo electrónico.</p>
      <p>Por favor verifica tu cuenta antes de iniciar sesión.</p>
      <p>Redirigiendo al login en <strong>{segundos}</strong> segundos...</p>
    </div>
  );
}

export default RegistroExitoso;