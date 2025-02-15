import { useEffect, useState } from 'react';
import { Product } from '../types';
import { Heart } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    let saved: any = localStorage.getItem('favorites');
    saved = JSON.parse(saved);
    setFavorites(saved);
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  const toggleFavorite = (product: Product) => {
    setFavorites((prev: any) => {
      const exists = prev.some((f: Product) => f.id === product.id);
      if (exists) {
        return prev.filter((f: Product) => f.id !== product.id);
      }
      return [...prev, product];
    });
  };
  return (
    <div>
      <div className='products-grid'>
        {products &&
          products.map((product: Product) => (
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
                  <Heart
                    size={20}
                    fill={
                      favorites.some((f: Product) => f.id === product.id)
                        ? '#e74c3c'
                        : 'none'
                    }
                  />
                  {favorites.some((f: Product) => f.id === product.id)
                    ? 'Remove from Favorites'
                    : 'Add to Favorites'}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
