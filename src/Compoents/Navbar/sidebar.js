import React from 'react';
import {BsFillPersonFill} from "react-icons/bs"
import {MdProductionQuantityLimits,MdOutlinePinch,MdLabelImportant} from "react-icons/md"
import {AiOutlineTeam} from "react-icons/ai"
import { RiAccountCircleFill } from "react-icons/ri"

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
    icon: <MdProductionQuantityLimits fontSize="25px"/>,
    cName: 'nav-text',
    component:<AdminHomePage/>
  },
  {
    title: 'Add Customer',
    path: '/Customersignup',
    icon: <BsFillPersonFill fontSize="25px"/>,
    cName: 'nav-text',
    component:<Customersignup/>
  },
  {
    title: 'Add Staff',
    path: '/staffsignup',
    icon: <AiOutlineTeam fontSize="25px" />,
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
    icon: <MdOutlinePinch fontSize="25px"/>,
    cName: 'nav-text',
    component:<DimensionOrderList/>
  },
  {
    title: 'Label Orders',
    path: '/support',
    icon: <MdLabelImportant fontSize="25px"/>,
    cName: 'nav-text',
    component:<LabelOrders/>
  },
  {
    title: 'Accountant',
    path: '/support',
    icon: <RiAccountCircleFill fontSize="25px"/>,
    cName: 'nav-text',
    component:<AccountOrders/>
  },
];
