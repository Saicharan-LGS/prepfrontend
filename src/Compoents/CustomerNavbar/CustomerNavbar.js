import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

// import AdminHomePage from '../AdminHomePage';
// import DimensionOrderList from '../DimensionOrders';
// import LabelOrders from '../labelOrders';

import CustomerHomePage from "../CustomerHomePage";
import CustomerOrder from "../customerOrder";
export const CustomerNavbarData = [
  {
    title: "Invoice Pending",
    id: 5,

    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    component: <CustomerHomePage />,
  },
  {
    title: "Invoice Accepted",
    id: 6,
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
    component: <CustomerHomePage />,
  },
  {
    title: "Invoice Rejected",
    id: 7,
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
    component: <CustomerHomePage />,
  },
  {
    title: "All Orders",
    id: 8,
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
    component: <CustomerHomePage />,
  },
  {
    title: "Post Order",
    id: 9,
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
    component: <CustomerOrder />,
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
