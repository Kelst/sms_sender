import React from 'react';
import { useProvider } from './ProviderContext';

const ProviderSelectionPage = ({ brands }) => {
  const { setCurrentBrand } = useProvider();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Виберіть провайдера
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          {brands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => setCurrentBrand(brand)}
              className="w-full p-4 text-xl font-medium rounded-lg border border-gray-300 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{ color: brand.color }}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderSelectionPage;