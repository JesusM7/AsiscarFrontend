// PWA Utility functions for offline support and caching

// Check if the app is running in standalone mode (installed as PWA)
export const isStandalone = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone ||
         document.referrer.includes('android-app://');
};

// Check if device is online
export const isOnline = () => {
  return navigator.onLine;
};

// Local storage with expiration
export const setStorageWithExpiry = (key, value, ttl = 24 * 60 * 60 * 1000) => { // 24 hours default
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getStorageWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  
  const item = JSON.parse(itemStr);
  const now = new Date();
  
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  
  return item.value;
};

// Queue for offline actions
export const addToOfflineQueue = (action) => {
  const queue = getOfflineQueue();
  queue.push({
    ...action,
    timestamp: Date.now(),
    id: generateId()
  });
  localStorage.setItem('offlineQueue', JSON.stringify(queue));
};

export const getOfflineQueue = () => {
  const queue = localStorage.getItem('offlineQueue');
  return queue ? JSON.parse(queue) : [];
};

export const removeFromOfflineQueue = (id) => {
  const queue = getOfflineQueue();
  const filteredQueue = queue.filter(item => item.id !== id);
  localStorage.setItem('offlineQueue', JSON.stringify(filteredQueue));
};

export const clearOfflineQueue = () => {
  localStorage.removeItem('offlineQueue');
};

// Process offline queue when back online
export const processOfflineQueue = async () => {
  if (!isOnline()) return;
  
  const queue = getOfflineQueue();
  const results = [];
  
  for (const item of queue) {
    try {
      // Process the queued action
      const result = await processOfflineAction(item);
      results.push({ success: true, item, result });
      removeFromOfflineQueue(item.id);
    } catch (error) {
      console.error('Error processing offline action:', error);
      results.push({ success: false, item, error });
    }
  }
  
  return results;
};

// Process individual offline action
const processOfflineAction = async (action) => {
  switch (action.type) {
    case 'API_CALL':
      return await fetch(action.url, action.options);
    case 'FORM_SUBMIT':
      return await submitForm(action.data);
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Submit form data
const submitForm = async (data) => {
  // Implement form submission logic here
  console.log('Submitting form data:', data);
  return { success: true, data };
};

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Show notification (if supported)
export const showNotification = (title, options = {}) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    return new Notification(title, {
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      ...options
    });
  }
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

// Background sync (if supported)
export const registerBackgroundSync = (tag) => {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then(registration => {
      return registration.sync.register(tag);
    });
  }
};

// Share API (if supported)
export const shareContent = async (data) => {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  }
  return false;
};

// Vibrate API (if supported)
export const vibrate = (pattern = [200]) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

// Get device info
export const getDeviceInfo = () => {
  return {
    isStandalone: isStandalone(),
    isOnline: isOnline(),
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    screenWidth: screen.width,
    screenHeight: screen.height,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  };
};

// Cache management
export const clearAppCache = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(name => caches.delete(name))
    );
  }
};

// Service Worker messaging
export const sendMessageToSW = (message) => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  }
};

export default {
  isStandalone,
  isOnline,
  setStorageWithExpiry,
  getStorageWithExpiry,
  addToOfflineQueue,
  getOfflineQueue,
  removeFromOfflineQueue,
  clearOfflineQueue,
  processOfflineQueue,
  showNotification,
  requestNotificationPermission,
  registerBackgroundSync,
  shareContent,
  vibrate,
  getDeviceInfo,
  clearAppCache,
  sendMessageToSW
}; 