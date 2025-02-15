import { useEffect, useState } from 'react';
import { Product } from '../types';
import { Heart } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

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
    let result = products;

    if (searchTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

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

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search products...'
          className='search-input'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='category-filter'>
        <select
          className='filter-select'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value=''>All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className='products-grid'>
        {filteredProducts &&
          filteredProducts.map((product: Product) => (
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
