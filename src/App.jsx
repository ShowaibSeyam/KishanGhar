import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import CropDetection from './pages/CropDetection';
import LivestockPage from './pages/LivestockPage';
import AnimalDetection from './pages/AnimalDetection';
import AIAssistant from './pages/AIAssistant';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 pt-16">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <PrivateRoute><Dashboard /></PrivateRoute>
                  } />
                  <Route path="/crop-detection" element={
                    <PrivateRoute><CropDetection /></PrivateRoute>
                  } />
                  <Route path="/livestock" element={
                    <PrivateRoute><LivestockPage /></PrivateRoute>
                  } />
                  <Route path="/animal-detection" element={
                    <PrivateRoute><AnimalDetection /></PrivateRoute>
                  } />
                  <Route path="/ai-assistant" element={
                    <PrivateRoute><AIAssistant /></PrivateRoute>
                  } />
                  <Route path="/profile" element={
                    <PrivateRoute><ProfilePage /></PrivateRoute>
                  } />
                  <Route path="/admin" element={
                    <AdminRoute><AdminPage /></AdminRoute>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
