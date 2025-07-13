import { useState, useEffect } from 'react';
import './OfflinePage.css';

const OfflinePage = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (isOnline) {
    return null;
  }

  return (
    <div className="offline-page">
      <div className="offline-content">
        <div className="offline-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM17 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="currentColor"/>
            <path d="M1 9l2-2 2 2M5 9l2-2 2 2M9 9l2-2 2 2M13 9l2-2 2 2M17 9l2-2 2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1>Sin conexión a internet</h1>
        <p>
          No hay conexión a internet en este momento. Algunas funciones pueden no estar disponibles.
        </p>
        
        <div className="offline-actions">
          <button onClick={handleRetry} className="retry-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Reintentar
          </button>
        </div>
        
        <div className="offline-info">
          <h3>Funciones disponibles sin conexión:</h3>
          <ul>
            <li>Ver datos guardados previamente</li>
            <li>Navegar por la aplicación</li>
            <li>Acceder a información básica</li>
          </ul>
          
          <p className="offline-note">
            Los datos se sincronizarán automáticamente cuando se restablezca la conexión.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage; 