import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading...</div>;

  return token ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading...</div>;

  return !token ? children : <Navigate to="/tasks" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/tasks" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
