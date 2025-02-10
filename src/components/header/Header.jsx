import React, { useState, useMemo } from 'react';
import styles from "./header.module.css";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useProvider } from '../../ProviderContext';
import Cookies from 'js-cookie';
import { LogOut } from 'lucide-react';

function Header({ brands }) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentBrand, setCurrentBrand } = useProvider();
  const navigate = useNavigate();

  // Get available providers from cookies
  const availableBrands = useMemo(() => {
    const providerAccessStr = Cookies.get('providerAccess');
    const providerAccess = providerAccessStr ? JSON.parse(providerAccessStr) : null;
    
    if (!providerAccess) {
      return [];
    }

    return brands.filter(brand => {
      const providerKey = brand.name.toLowerCase();
      return providerAccess[providerKey] === 1;
    });
  }, [brands]);

  const getNavClass = ({ isActive }) => isActive ? styles.active : "";

  const handleBrandChange = (brand) => {
    setCurrentBrand(brand);
    localStorage.setItem('currentBrand', JSON.stringify(brand));
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove('login');
    Cookies.remove('providerAccess');
    Cookies.remove('aid');
    
    // Clear localStorage
    localStorage.removeItem('currentBrand');
    
    // Redirect to login page
    navigate('/login');
  };

  // Don't show dropdown button if only one provider is available
  const showDropdown = availableBrands.length > 1;

  return (
    <>
      <header>
        <nav className={styles.nav}>
          <div className='relative'>
            <div 
              className='flex justify-center items-end cursor-pointer'
              onClick={() => showDropdown && setIsOpen(!isOpen)}
              style={{ cursor: showDropdown ? 'pointer' : 'default' }}
            >
              <h1 className={styles.logo} style={{ color: currentBrand.color }}>
                {currentBrand.name}
              </h1>
              <h2 className='text-xl ml-2'>Сервіс відправлення повідомлень</h2>
            </div>
            
            {isOpen && showDropdown && (
              <div className={styles.dropdown}>
                {availableBrands
                  .filter(brand => brand.name !== currentBrand.name)
                  .map((brand) => (
                    <div
                      key={brand.name}
                      className={styles.dropdownItem}
                      onClick={() => handleBrandChange(brand)}
                      style={{ color: brand.color }}
                    >
                      {brand.name}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <ul className={styles.menu}>
            <li className={styles.menu_item}>
              <NavLink className={getNavClass} to='sms'>SMS</NavLink>
            </li>
            <li className={styles.menu_item}>
              <NavLink className={getNavClass} to='history'>History</NavLink>
            </li>
            <li className={styles.menu_item}>
              <NavLink className={getNavClass} to='status'>Status</NavLink>
            </li>
            <li className={styles.menu_item}>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-500 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Вихід
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet/>
    </>
  );
}

export default Header;