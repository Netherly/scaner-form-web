import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext.jsx";

import LoginPage from "./pages/LoginPage";
import FormsPage from './pages/FormsPage';
import FormRouter from './pages/FormRouter';

import './App.css'

function App() {


  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/form/:formType" element={<FormRouter />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App