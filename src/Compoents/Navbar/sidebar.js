import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

import AdminHomePage from '../AdminHomePage';
import ProductList from '../adminOrders';
import Customersignup from '../CustomerSignup';
import StaffSignupPage from '../StaffRegistration';
import DimensionOrderList from '../DimensionOrders';
import LabelOrders from '../labelOrders';
import AccountOrders from '../AccountantPage';
export const SidebarData = [
  {
    title: 'View Order',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    component:<AdminHomePage/>
  },
  {
    title: 'Add Customer',
    path: '/Customersignup',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    component:<Customersignup/>
  },
  {
    title: 'Add Staff',
    path: '/staffsignup',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    component:<StaffSignupPage/>
  },
  // {
  //   title: 'Admin',
  //   path: '/team',
  //   icon: <IoIcons.IoMdPeople />,
  //   cName: 'nav-text',
  //   component:<ProductList/>
  // },
  {
    title: 'Dimensions',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text',
    component:<DimensionOrderList/>
  },
  {
    title: 'Label Orders',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    component:<LabelOrders/>
  },
  {
    title: 'Accountant',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    component:<AccountOrders/>
  },
];
