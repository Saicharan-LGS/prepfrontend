import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

// import AdminHomePage from '../AdminHomePage';
// import DimensionOrderList from '../DimensionOrders';
// import LabelOrders from '../labelOrders';
import AccountOrders from '../AccountantPage';

import CustomerHomePage from '../CustomerHomePage';

export const CustomerNavbarData = [
  {
    title: 'Product',
    id:5,
    
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    component:<CustomerHomePage id={5}/>
    
  },
  {
    title: 'Accepted',
    id:6,
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    component:<CustomerHomePage id={6}/>
    
  },
  {
    title: 'Rejected',
    id:7,
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    component:<CustomerHomePage id={7}/>
  },
//   {
//     title: 'Accountant',
//     icon: <IoIcons.IoMdPeople />,
//     cName: 'nav-text',
//     component:<AccountOrders/>
//   },
//   {
//     title: 'Customer',
//     icon: <FaIcons.FaEnvelopeOpenText />,
//     cName: 'nav-text'
//   },
  
];