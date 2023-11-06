import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

// import AdminHomePage from '../AdminHomePage';
// import DimensionOrderList from '../DimensionOrders';
// import LabelOrders from '../labelOrders';
import AccountOrders from '../AccountantPage';

import ProductList from '../adminOrders';
import AdminOrdersAccepted from '../AdminHomePage/AdminOrdersAccepted';
import AdminOrdersRejected from '../AdminHomePage/AdminOrdersRejected';

export const CustomerNavbarData = [
  {
    title: 'Product',
    
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    component:<ProductList/>
    
  },
  {
    title: 'Accepted',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    component:<AdminOrdersAccepted/>
    
  },
  {
    title: 'Rejected',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    component:<AdminOrdersRejected/>
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