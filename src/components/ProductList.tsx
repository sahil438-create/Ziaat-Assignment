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
      {products &&
        products.map((product: any) => (
          <div key={product.id}>
            <img height='100px' width='100px' src={product.image} alt='' />
            <div>{product.title}</div>
          </div>
        ))}
    </div>
  );
};

export default ProductList;
