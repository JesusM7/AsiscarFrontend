# PWA Features - ASISCAR

## 🚀 Funcionalidades PWA Implementadas

### 1. **Instalación de la Aplicación**
- **Prompt de Instalación**: Aparece automáticamente después de 3 segundos si la app no está instalada
- **Detección de Instalación**: Verifica si la app ya está instalada como PWA
- **Iconos PWA**: Iconos de 192x192 y 512x512 para diferentes dispositivos
- **Manifest**: Configuración completa del web app manifest

### 2. **Service Worker**
- **Caché Automático**: Precarga de archivos estáticos (JS, CSS, HTML, imágenes)
- **Estrategias de Caché**:
  - `NetworkFirst` para APIs (24 horas de caché)
  - `CacheFirst` para imágenes (30 días de caché)
- **Actualizaciones Automáticas**: Detecta y aplica actualizaciones automáticamente

### 3. **Funcionalidad Offline**
- **Detección de Conexión**: Monitorea el estado online/offline
- **Página Offline**: Página personalizada cuando no hay conexión
- **Cola de Acciones Offline**: Guarda acciones para ejecutar cuando vuelva la conexión
- **Sincronización**: Procesa automáticamente las acciones pendientes

### 4. **Notificaciones y Estado**
- **Notificaciones de Actualización**: Informa cuando hay una nueva versión disponible
- **Estado de Conexión**: Muestra el estado actual de la conexión
- **Notificaciones Push**: Soporte para notificaciones del sistema

### 5. **Características Móviles**
- **Modo Standalone**: Funciona como app nativa cuando se instala
- **Orientación Portrait**: Optimizada para uso móvil
- **Shortcuts**: Accesos directos a funciones principales

## 📱 Componentes Implementados

### `PWAInstallPrompt`
- Prompt de instalación con diseño moderno
- Botones de "Instalar" y "Ahora no"
- Animaciones suaves y responsive

### `PWAStatus`
- Indicador de estado de conexión
- Notificaciones de actualización
- Botones de acción (actualizar, descartar)
- Posicionamiento fijo en la parte superior

### `OfflinePage`
- Página completa para modo offline
- Lista de funciones disponibles sin conexión
- Botón de reintento
- Diseño responsive y accesible

### `usePWA` Hook
- Hook personalizado para gestionar PWA
- Estados de instalación, conexión y actualizaciones
- Funciones para instalar, actualizar y descartar


## 🔧 Configuración Técnica

### Vite Configuration
```javascript
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
  manifest: {
    name: 'ASISCAR - Sistema de asistencia vehicular',
    short_name: 'ASISCAR',
    description: 'Sistema de asistencia vehicular',
    theme_color: '#2563eb',
    background_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
    // ... más configuraciones
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    runtimeCaching: [
      // Configuración de caché para APIs e imágenes
    ]
  }
})
```

## 📊 Métricas PWA


### Funciones Soportadas
- ✅ Web App Manifest válido
- ✅ Iconos de múltiples tamaños
- ✅ Instalación en dispositivos
- ✅ Actualizaciones automáticas

## 🚀 Cómo Usar

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm run preview
```

### Instalación PWA
1. Abrir la aplicación en el navegador
2. Esperar el prompt de instalación (3 segundos)
3. Hacer clic en "Instalar"
4. La app se instalará como aplicación nativa

### Funciones Offline
1. Desconectar internet
2. La app seguirá funcionando
3. Se mostrará el estado offline
4. Las acciones se guardarán en cola
5. Al reconectar, se sincronizarán automáticamente

## 🔍 Testing PWA

### Chrome DevTools
1. Abrir DevTools
2. Ir a "Application" tab
3. Verificar "Service Workers"
4. Verificar "Manifest"
5. Simular offline en "Network" tab

### Lighthouse Audit
1. Abrir DevTools
2. Ir a "Lighthouse" tab
3. Seleccionar "Progressive Web App"
4. Ejecutar audit

## 📱 Compatibilidad

- ✅ Chrome (Android/Desktop)
- ✅ Firefox (Android/Desktop)
- ✅ Safari (iOS/macOS)
- ✅ Edge (Windows/Android)
- ✅ Samsung Internet
