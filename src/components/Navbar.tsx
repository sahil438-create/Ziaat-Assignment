import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='container nav-content'>
        <Link to='/' className='nav-logo'>
          <span>Shop</span>
        </Link>
        <div className='nav-links'>
          <Link to='/' className='nav-link'>
            Products
          </Link>
          <Link to='/favorites' className='nav-link'>
            <span
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Heart size={18} />
              Favorites
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
