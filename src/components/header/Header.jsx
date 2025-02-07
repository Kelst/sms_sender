import React, { useState } from 'react';
import styles from "./header.module.css";
import { NavLink, Outlet } from 'react-router-dom';
import { useProvider } from '../../ProviderContext';

function Header({ brands }) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentBrand, setCurrentBrand } = useProvider();

  const getNavClass = ({ isActive }) => isActive ? styles.active : "";

  const handleBrandChange = (brand) => {
    setCurrentBrand(brand);
    localStorage.setItem('currentBrand', JSON.stringify(brand));
    setIsOpen(false);
  };

  return (
    <>
      <header>
        <nav className={styles.nav}>
          <div className='relative'>
            <div 
              className='flex justify-center items-end cursor-pointer'
              onClick={() => setIsOpen(!isOpen)}
            >
              <h1 className={styles.logo} style={{ color: currentBrand.color }}>
                {currentBrand.name}
              </h1>
              <h2 className='text-xl ml-2'>Сервіс відправлення повідомлень</h2>
            </div>
            
            {isOpen && (
              <div className={styles.dropdown}>
                {brands.map((brand) => (
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
          </ul>
        </nav>
      </header>
      <Outlet/>
    </>
  );
}

export default Header;