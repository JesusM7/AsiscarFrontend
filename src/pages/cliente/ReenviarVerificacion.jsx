import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { ENDPOINTS } from '../../config/api.config';
import ErrorMessage from '../../components/ErrorMessage';
import './LoginCliente.css';

function ReenviarVerificacion() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [contador, setContador] = useState(5);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setLoading(true);

    try {
      const res = await API.post(ENDPOINTS.AUTH.RESEND_VERIFICATION, { email });
      setMensaje(res.data.message);
      setContador(5); // iniciar la cuenta regresiva
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al reenviar el enlace';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Cuenta regresiva y redirección
  useEffect(() => {
    if (!mensaje) return;

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
  }, [mensaje, navigate]);

  return (
    <div className="login-cliente">
      <h2>📩 Reenviar verificación</h2>

      {error && <ErrorMessage error={error} />}

      {mensaje && (
        <div className="mensaje-exito">
          <p>{mensaje}</p>
          <p>Redirigiendo al login en <strong>{contador}</strong> segundos...</p>
        </div>
      )}

      {!mensaje && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className={error ? 'input-error' : ''}
            />
          </div>

          <button type="submit" disabled={loading || !email}>
            {loading ? 'Enviando...' : 'Reenviar enlace'}
          </button>
        </form>
      )}

      {!mensaje && (
        <div className="login-extra">
            <p>¿Ya verificaste tu cuenta? <a href="/login">Inicia sesión aquí</a></p>
            <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
        </div>
        )}
    </div>
  );
}

export default ReenviarVerificacion;