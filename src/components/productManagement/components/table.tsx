import { Product } from '../../../utils/hooks/useApi/interfaces/response.interfaces';
import TableRow from './tableRow';

interface Props {
  products: Product[];
  fetchData: () => Promise<void>;
}

export default function Table({ products, fetchData }: Readonly<Props>) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-[#71717c] text-sm bg-[#f2f4f7]">
        <tr>
          <th scope="col" className="px-14 py-3">
            Name
          </th>
          <th scope="col" className="px-14 py-3">
            Description
          </th>
          <th scope="col" className="px-14 py-3">
            Price (ARS)
          </th>
          <th scope="col" className="px-14 py-3">
            Price (USD)
          </th>
          <th scope="col" className="px-14 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <TableRow
            key={product.id}
            product={product}
            fetchProducts={fetchData}
          />
        ))}
        {products.length === 0 && (
          <tr className="bg-white border-b hover:bg-gray-50 transition-all">
            <td
              colSpan={5}
              className="px-14 py-4 text-black font-medium text-center"
            >
              No products found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
