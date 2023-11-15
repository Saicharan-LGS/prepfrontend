import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import {
  MdProductionQuantityLimits,
  MdOutlinePinch,
  MdLabelImportant,
} from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";

import AdminHomePage from "../AdminHomePage";
import Customersignup from "../CustomerSignup";
import StaffSignupPage from "../StaffRegistration";
import DimensionOrderList from "../DimensionOrders";
import LabelOrders from "../labelOrders";
import AccountOrders from "../AccountantPage";
export const SidebarData = [
  {
    id:'1',
    title: 'View Order',
    path: '/',
    icon: <MdProductionQuantityLimits fontSize="25px"/>,
    cName: 'active-nav-item',
    component:<AdminHomePage/>
  },
  {
    id:'2',
    title: 'Add Customer',
    path: '/Customersignup',
    icon: <BsFillPersonFill fontSize="25px"/>,
    cName: '',
    component:<Customersignup/>
  },
  {
    id:'3',
    title: 'Add Staff',
    path: '/staffsignup',
    icon: <AiOutlineTeam fontSize="25px" />,
    cName: '',
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
    id:'4',
    title: 'Dimensions',
    path: '/messages',
    icon: <MdOutlinePinch fontSize="25px"/>,
    cName: '',
    component:<DimensionOrderList/>
  },
  {
    id:'5',
    title: 'Label Orders',
    path: '/support',
    icon: <MdLabelImportant fontSize="25px"/>,
    cName: '',
    component:<LabelOrders/>
  },
  {
    id:'6',
    title: 'Accountant',
    path: '/support',
    icon: <RiAccountCircleFill fontSize="25px"/>,
    cName: '',
    component:<AccountOrders/>
  },
];
