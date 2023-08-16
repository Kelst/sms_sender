import React from 'react'
import styles from  "./header.module.css"
import { Link, NavLink, Outlet } from 'react-router-dom'
function Header() {
  
  return (
    <>
    <header>
        <nav className={styles.nav}>
          <div className='flex justify-center items-end'>
            <h1 className={styles.logo}>Intelekt  </h1>
            <h2 className='text-xl ml-2'>Сервіс відправлення повідомлень</h2> 
            </div>
            <ul className={styles.menu}>
               <li className={styles.menu_item}>
                <NavLink 
                  className={({ isActive, isPending }) => isPending ? "pending" : isActive ? styles.active : ""
                  } to='sms'>SMS</NavLink></li>
                <li className={styles.menu_item}><NavLink
                className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }
                to='history'>History</NavLink></li>
                <li className={styles.menu_item}><NavLink 
                className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active: ""
              }
                to='status'>Status</NavLink></li>

            </ul>
        </nav>
    </header>
    <Outlet/>
    </>
  )
}

export default Header