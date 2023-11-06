import React, { useState,useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CustomerNavbarData } from './CustomerNavbar.js';
import './index.css';
import { IconContext } from 'react-icons';

import CustomerHomePage from '../CustomerHomePage';

function CustomerNavbar() {
  const [sidebar, setSidebar] = useState(false);
  const [status,setStaus]=useState(5)
  const [currentComponent, setCurrentComponent] = useState(<CustomerHomePage id={status} />);

  const showSidebar = () => setSidebar(!sidebar);

  const handleSidebarItemClick = async(path, component,id) => {
    await setSidebar(false);
    console.log(id)
    await setStaus(id)
    await setCurrentComponent(component);
  };

  useEffect(() => {
    handleSidebarItemClick()
  },[status])
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
            {CustomerNavbarData.map((item, index) =>{ 
              
              return(
              <li key={index} className={item.cName} onClick={() => handleSidebarItemClick(item.path, item.component,item.id)}>
                <Link to={item.path}>
                  {item.icon}
                  <span className=".span">{item.title}</span>
                </Link>
              </li>
            )})}
          </ul>
        </nav>
      </IconContext.Provider>

      <div className={`content-container ${sidebar ? 'shifted' : ''}`}>
        {currentComponent}
      </div>
    </div>
  );
}

export default CustomerNavbar;
