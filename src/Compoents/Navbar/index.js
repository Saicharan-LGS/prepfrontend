import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebar';
import './index.css';
import { IconContext } from 'react-icons';
import AdminHomePage from '../AdminHomePage';
import DimensionOrderList from '../DimensionOrders';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(<AdminHomePage />);

  const showSidebar = () => setSidebar(!sidebar);

  const handleSidebarItemClick = (path, component) => {
    setSidebar(false);
    setCurrentComponent(component);
  };

  return (
    <div className="navbar-container">
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={`navbar ${sidebar ? 'shifted' : ''}`}>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <p className="navbar-logout-button">Logout</p>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName} onClick={() => handleSidebarItemClick(item.path, item.component)}>
                <Link to={item.path}>
                  {item.icon}
                  <span className=".span">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>

      <div className={`content-container ${sidebar ? 'shifted' : ''}`}>
        {currentComponent}
      </div>
    </div>
  );
}

export default Navbar;
