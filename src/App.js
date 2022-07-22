import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Details from './views/Details';
import Edit from './views/Edit';

function App() {
  return (
    <div>
      <p>
        <Link to="/dashboard"> Dashboard </Link> 
      </p>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/products/:id/edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
