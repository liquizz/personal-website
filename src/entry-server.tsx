import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import './i18n';

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
