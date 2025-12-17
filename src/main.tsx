import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import ErrorOverlay from './ErrorOverlay';

// global handlers to surface uncaught errors to the DOM overlay
function installGlobalErrorHandlers() {
  (window as any).__elevator_error__ = null;
  window.addEventListener('error', (ev) => {
    // ensure overlay picks it up via console.error
    // eslint-disable-next-line no-console
    console.error('Global error:', ev.error || ev.message || ev);
  });
  window.addEventListener('unhandledrejection', (ev) => {
    // eslint-disable-next-line no-console
    console.error('Unhandled promise rejection:', ev.reason);
  });
}

installGlobalErrorHandlers();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorOverlay>
      <App />
    </ErrorOverlay>
  </React.StrictMode>
);