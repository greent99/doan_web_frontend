import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './components/Register/index'
import Login from './components/Login/index'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/auth/register">
          <Register />
        </Route>
        <Route exact path="/auth/login">
          <Login />
        </Route>
      </div>
    </Router>
  );
}

export default App;
