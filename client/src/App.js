import './App.css';
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";
import Landing from './componects/layout/landing'
import Dashboard from './componects/layout/Dashboard'
import Auth from './views/Auth'
import AuthcontextProvider from './contexts/AuthContexts'

function App() {
  return (
    <AuthcontextProvider>
      <Router>
        <Routes >
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={ <Auth authRouter='login' />} />
            <Route exact path="/register" element={ <Auth authRouter='register' />} />
            <Route exact path="/dashboard" element={ <Dashboard />} />
        </Routes>
      </Router>
    </AuthcontextProvider>
  );
}

export default App;
