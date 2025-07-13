import { useState, useEffect } from 'react';
import './PWAStatus.css';

const PWAStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showUpdateAvailable, setShowUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Handle service worker updates
    const handleSWUpdate = (registration) => {
      setRegistration(registration);
      setShowUpdateAvailable(true);
    };

    // Listen for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                handleSWUpdate(registration);
              }
            });
          }
        });
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleUpdateApp = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  const dismissUpdate = () => {
    setShowUpdateAvailable(false);
  };

  return (
    <>
      {/* Connection Status */}
      {!isOnline && (
        <div className="pwa-status offline">
          <div className="pwa-status-content">
            <div className="pwa-status-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
              </svg>
            </div>
            <span>Sin conexión - Trabajando sin conexión</span>
          </div>
        </div>
      )}

      {/* Update Available */}
      {showUpdateAvailable && (
        <div className="pwa-status update-available">
          <div className="pwa-status-content">
            <div className="pwa-status-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
              </svg>
            </div>
            <span>Nueva versión disponible</span>
            <div className="pwa-status-actions">
              <button onClick={handleUpdateApp} className="pwa-status-button update">
                Actualizar
              </button>
              <button onClick={dismissUpdate} className="pwa-status-button dismiss">
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAStatus; 