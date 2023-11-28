// App.tsx
import { Route, Routes } from 'react-router-dom';
import { AuthenticationGuard } from './components/authentication-guard';
import { HomePage } from './pages/home';
import { InitialPage } from './pages/initialPage';
import { ProfilePage } from './pages/profilePage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<InitialPage />} />
      <Route 
        path="/home" 
        element={<AuthenticationGuard component={HomePage} />} 
      />
      <Route 
        path="/profile" 
        element={<AuthenticationGuard component={ProfilePage} />} 
      />
    </Routes>
  );
};
