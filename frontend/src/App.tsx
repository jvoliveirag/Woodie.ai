// App.tsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { InitialPage } from './pages/initialPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;