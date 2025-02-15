import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
