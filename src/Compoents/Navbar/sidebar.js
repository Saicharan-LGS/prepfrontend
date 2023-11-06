import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

import AdminHomePage from '../AdminHomePage';
import DimensionOrderList from '../DimensionOrders';
import LabelOrders from '../labelOrders';
import AccountOrders from '../AccountantPage';

export const SidebarData = [
  {
    title: 'Admin',
    
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    component:<AdminHomePage/>
    
  },
  {
    title: 'Dimensions',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    component:<DimensionOrderList/>
    
  },
  {
    title: 'Label',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    component:<LabelOrders/>
  },
  {
    title: 'Accountant',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
    component:<AccountOrders/>
  },
  {
    title: 'Customer',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  
];