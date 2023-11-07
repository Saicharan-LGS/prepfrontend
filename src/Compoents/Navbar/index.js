


import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebar';
import './index.css';
import { useNavigate } from "react-router-dom";
import { IconContext } from 'react-icons';
import ProductList from '../adminOrders';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(<ProductList />);

  const showSidebar = () => setSidebar(!sidebar);

  const handleSidebarItemClick = (path, component) => {
    setSidebar(false);
    setCurrentComponent(component);
  };

  const navigate=useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="navbar-logout-button-container">
            <button className="navbar-logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to='' onClick={() => handleSidebarItemClick(item.path, item.component)}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
                  
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
      <div className={`content-container ${sidebar ? "shifted" : ""}`}>
        {currentComponent}
      </div>
    </>
  );
}

export default Navbar;
