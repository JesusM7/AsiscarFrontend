import { useState } from 'react';
import API from '../../services/api';
import { ENDPOINTS } from '../../config/api.config';
import ErrorMessage from '../../components/ErrorMessage';

function ReenviarVerificacion() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setLoading(true);

    try {
      const res = await API.post(ENDPOINTS.AUTH.RESEND_VERIFICATION, { email });
      setMensaje(res.data.message);
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al reenviar el enlace';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verificacion-reenvio">
      <h2>📩 Reenviar verificación</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !email}>
          {loading ? 'Enviando...' : 'Reenviar enlace'}
        </button>
      </form>

      {mensaje && <p className="mensaje-exito">{mensaje}</p>}
      {error && <ErrorMessage error={error} />}
    </div>
  );
}

export default ReenviarVerificacion;