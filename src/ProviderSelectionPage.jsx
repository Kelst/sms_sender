import React from 'react';
import { useProvider } from './ProviderContext';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const ProviderSelectionPage = ({ brands }) => {
  const { setCurrentBrand } = useProvider();
  
  // Get provider access from cookies
  const providerAccessStr = Cookies.get('providerAccess');
  const providerAccess = providerAccessStr ? JSON.parse(providerAccessStr) : null;
  
  // Redirect to login if no access data
  if (!providerAccess) {
    return <Navigate to="/login" />;
  }

  // Filter brands based on access permissions
  const availableBrands = brands.filter(brand => {
    const providerKey = brand.name.toLowerCase();
    return providerAccess[providerKey] === 1;
  });

  // If no available brands, show message
  if (availableBrands.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Немає доступних провайдерів
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Виберіть провайдера
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          {availableBrands.map((brand) => (
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