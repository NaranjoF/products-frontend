import { useState } from 'react';
import Toastify from 'toastify-js';
import { Product } from '../hooks/useApi/interfaces/response.interfaces';
import { useApi } from '../hooks/useApi/useApi';

export default function useTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const api = useApi();

  const fetchProducts = async () => {
    const response = await api.get<Product[]>('/products');
    setProducts(response);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      await fetchProducts();
    } catch (error) {
      Toastify({
        text: 'There is an error retrieving data',
        style: {
          background: 'linear-gradient(to right, #ff0000, #ff8000)',
        },
        duration: 3000,
      }).showToast();
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    fetchData,
  };
}
