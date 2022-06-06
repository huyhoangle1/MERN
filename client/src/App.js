import './App.css';
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";
import Landing from './componects/layout/landing'
import Auth from './views/Auth'

function App() {
  return (
    <Router>
      <Routes >
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" render={ (props) => <Auth {...props} authRouter='login' />} />
          <Route exact path="/register" render={ (props) =><Auth {...props} authRouter='register' />} />
      </Routes>
    </Router>
  );
}

export default App;
