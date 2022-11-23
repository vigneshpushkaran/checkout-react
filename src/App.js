import './App.css';
import {Checkout} from './pages/Checkout/Checkout';
import Counter from './pages/Counter/Counter';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <nav>
              <Link to="/">Home</Link>

              <Link to="/checkout">checkout</Link>
    
              <Link to="/counter">Counter</Link>
        </nav>
        <Routes>
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/counter" element={<Counter/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
