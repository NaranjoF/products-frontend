import useTable from '../../utils/useTable/useTable';
import ManageProductModal from './components/manageProductModal';
import Table from './components/table';
import { useEffect, useState } from 'react';

export default function ProductManagement() {
  const { fetchData, loading, products } = useTable();
  const [isHiddenModal, setIsHiddenModal] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative overflow-x-auto min-w-[76rem] max-w-[76rem] min-h-[43.9rem] max-h-[43.9rem]">
      <button
        type="button"
        className={
          'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 w-full cursor-pointer'
        }
        onClick={() => setIsHiddenModal(false)}
      >
        Create new product
      </button>
      <ManageProductModal
        fetchProducts={fetchData}
        hidden={isHiddenModal}
        setIsHiddenModal={setIsHiddenModal}
      />
      <Table products={products} fetchData={fetchData} />
    </div>
  );
}
