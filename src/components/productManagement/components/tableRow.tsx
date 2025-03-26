import { useState } from 'react';
import { Product } from '../../../utils/hooks/useApi/interfaces/response.interfaces';
import ManageProductModal from './manageProductModal';

interface Props {
  product: Product;
  fetchProducts: () => Promise<void>;
}

export default function TableRow({ product, fetchProducts }: Readonly<Props>) {
  const [isHiddenModal, setIsHiddenModal] = useState(true);

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition-all">
      <td className="px-14 py-4 text-black font-medium">{product.name}</td>
      <td className="px-14 py-4 text-black font-medium">
        {product.description}
      </td>
      <td className="px-14 py-4 text-black font-medium">{product.price}</td>
      <td className="px-14 py-4 text-black font-medium">{product.price_usd}</td>
      <td className="px-14 py-4 text-black font-medium">
        <ManageProductModal
          fetchProducts={fetchProducts}
          product={product}
          hidden={isHiddenModal}
          setIsHiddenModal={setIsHiddenModal}
        />
        <button
          type="button"
          className="bg-[#eef7ff] text-[#1d4ed8] p-2 rounded-lg cursor-pointer"
          onClick={() => setIsHiddenModal(false)}
        >
          Edit Product
        </button>
      </td>
    </tr>
  );
}
