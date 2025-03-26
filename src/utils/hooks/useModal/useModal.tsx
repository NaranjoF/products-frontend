import { useEffect, useState } from 'react';
import { useApi } from '../useApi/useApi';
import Toastify from 'toastify-js';
import { Product } from '../useApi/interfaces/response.interfaces';

interface Props {
  setIsHiddenModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProducts: () => Promise<void>;
  product?: Product;
}

export enum MODES {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
}

export default function useModal({
  setIsHiddenModal,
  fetchProducts,
  product,
}: Props) {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    if (product) {
      setFormValues({
        name: product.name,
        description: product.description,
        price: product.price,
      });
      setMode(MODES.EDIT);
    }
  }, [product]);

  const [mode, setMode] = useState(MODES.CREATE);

  const [isLoading, setIsLoading] = useState(false);

  const api = useApi();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleEdit = async (event: React.FormEvent, product: Product) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await api.put(`/products/${product.id}`, {
        ...formValues,
        price: Number(formValues.price),
      });
      await fetchProducts();
      Toastify({
        text: 'Product Updated Successfully',
        style: {
          background: 'linear-gradient(to right, #28a745, #218838)',
        },
        duration: 3000,
      }).showToast();
      setIsHiddenModal(true);
    } catch (error) {
      Toastify({
        text: 'There was an error updating the Product',
        style: {
          background: 'linear-gradient(to right, #ff0000, #ff8000)',
        },
        duration: 3000,
      }).showToast();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await api.post('/products', {
        ...formValues,
        price: Number(formValues.price),
      });
      await fetchProducts();
      Toastify({
        text: 'Product Created Successfully',
        duration: 3000,
        style: {
          background: 'linear-gradient(to right, #28a745, #218838)',
        },
      }).showToast();
      setIsHiddenModal(true);
      setMode(MODES.EDIT);
    } catch (error) {
      Toastify({
        text: 'There was an error creating the Product',
        style: {
          background: 'linear-gradient(to right, #ff0000, #ff8000)',
        },
        duration: 3000,
      }).showToast();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    if (mode === MODES.EDIT && product) {
      await handleEdit(event, product);
    } else {
      await handleCreate(event);
    }
  };

  const handleDelete = async (product: Product) => {
    const confirm = window.confirm(
      `Are you sure you want to delete the product "${product.name}"?`,
    );

    if (!confirm) return;

    try {
      setIsLoading(true);
      await api.del(`/products/${product.id}`);
      Toastify({
        text: 'Product Deleted Successfully',
        duration: 3000,
        style: {
          background: 'linear-gradient(to right, #28a745, #218838)',
        },
      }).showToast();

      await fetchProducts();
      setIsHiddenModal(true);
      setFormValues({
        name: '',
        description: '',
        price: '',
      });
    } catch (error) {
      Toastify({
        text: 'There was an error deleting the product',
        style: {
          background: 'linear-gradient(to right, #ff0000, #ff8000)',
        },
        duration: 3000,
      }).showToast();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleDelete,
    handleInputChange,
    handleSubmit,
    formValues,
    mode,
  };
}
