import { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState<any>(null);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <div>
      <div className='products-grid'>
        {products &&
          products.map((product: any) => (
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
                <button className='favorite-button'>fav</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
