import { Product } from '../../../utils/hooks/useApi/interfaces/response.interfaces';
import useModal, { MODES } from '../../../utils/hooks/useModal/useModal';

interface Props {
  hidden: boolean;
  setIsHiddenModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProducts: () => Promise<void>;
  product?: Product;
}

export default function ManageProductModal({
  hidden,
  setIsHiddenModal,
  fetchProducts,
  product,
}: Readonly<Props>) {
  const {
    formValues,
    handleDelete,
    handleInputChange,
    handleSubmit,
    isLoading,
    mode,
  } = useModal({ product, setIsHiddenModal, fetchProducts });

  return (
    <div
      className={`absolute w-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white py-5 px-14 rounded-lg shadow-lg ${hidden ? 'hidden' : ''}`}
    >
      <div className="absolute top-2 right-2 cursor-pointer">
        <button
          type="button"
          className="appearance-none bg-transparent border-none p-0 m-0 focus:outline-none cursor-pointer"
          onClick={() => setIsHiddenModal(true)}
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
      </div>

      <form className="mx-auto w-full" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="targetCurrency"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter product price"
            required
          />
        </div>

        <div
          className={`flex w-full ${mode === MODES.EDIT ? 'justify-between' : 'justify-end'}`}
        >
          {mode === MODES.EDIT && product && (
            <button
              type="button"
              className={`text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm
          w-full sm:w-auto px-5 py-2.5 text-center ${isLoading ? 'opacity-50 cursor-not-allowed hover:bg-red-700' : 'hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300'}`}
              onClick={() => handleDelete(product)}
              disabled={isLoading}
            >
              Delete product
            </button>
          )}
          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${isLoading ? 'opacity-50 cursor-not-allowed hover:bg-blue-700' : 'hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer'}`}
            disabled={isLoading}
          >
            {mode === MODES.EDIT ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
