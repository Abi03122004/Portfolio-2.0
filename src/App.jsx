import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import BootLoader from './sections/BootLoader';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [systemOnline, setSystemOnline] = useState(false);

  return (
    <ThemeProvider>
      <MainLayout>
        {systemOnline ? (
          <Dashboard />
        ) : (
          <BootLoader onBootComplete={() => setSystemOnline(true)} />
        )}
      </MainLayout>
    </ThemeProvider>
  );
}
