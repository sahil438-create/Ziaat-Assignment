import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    let saved: any = localStorage.getItem('favorites');
    saved = JSON.parse(saved);
    setFavorites(saved);
  }, []);

  const toggleFavorite = (product: Product) => {
    setFavorites((prev: any) => {
      const exists = prev.some((f: Product) => f.id === product.id);
      if (exists) {
        return prev.filter((f: Product) => f.id !== product.id);
      }
      return [...prev, product];
    });
  };

  if (favorites.length === 0) {
    return (
      <div
        className='container'
        style={{ textAlign: 'center', padding: '4rem 0' }}
      >
        <h2>No favorites yet</h2>
        <p>Start adding products to your favorites list!</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <h2 style={{ margin: '2rem 0' }}>Your Favorite Products</h2>
      <div className='products-grid'>
        {favorites.map((product) => (
          <div key={product.id} className='product-card'>
            <img
              src={product.image}
              alt={product.title}
              className='product-image'
            />

            <div className='product-info'>
              <h3 className='product-title'>{product.title}</h3>
              <p className='product-category'>{product.category}</p>
              <p className='product-price'>${product.price.toFixed(2)}</p>
              <button
                className='favorite-button'
                onClick={() => toggleFavorite(product)}
              >
                <Heart size={20} fill='#e74c3c' />
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
