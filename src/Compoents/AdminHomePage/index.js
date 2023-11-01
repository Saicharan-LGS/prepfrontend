import React, { Component } from 'react';
import ProductList from '../adminOrders';
import AdminOrdersRejected from './AdminOrdersRejected';
import AdminOrdersAccepted from './AdminOrdersAccepted';

import './index.css'

const tabList = [
  {
    id: '0',
    name: 'ProductList',
  },
  {
    id: '1',
    name: 'ProductList1',
  },
  {
    id: '2',
    name: 'ProductList2',
  },
];

class AdminHomePage extends Component {
  state = {
    activeProductTab: tabList[0].id,
  };

  onClickChangeActiveTab = (e) => {
    const selectedTabId = e.target.getAttribute('value');
    this.setState({ activeProductTab: selectedTabId });
  };

   

  render() {
    const { activeProductTab } = this.state;

    return (
      <>
        <div className="admin-home-page-main-container">
          <h1 className="admin-home-page-order-heading">Orders</h1>
          <ul className="admin-home-page-product-tabs-container">
            {tabList.map((eachProduct) => { 
                const activeProductTabColor = eachProduct.id===activeProductTab ? `admin-home-page-product-tab admin-home-page-active-product-tab-color` : "admin-home-page-product-tab"
                return(
              <li
                key={eachProduct.id}
                value={eachProduct.id}
                onClick={this.onClickChangeActiveTab}
                className={activeProductTabColor}
              >
                {eachProduct.name}
              </li>)
  })}
          </ul>
        </div>
        <div>
          {activeProductTab === '0' && <ProductList  />}
          {activeProductTab === '1' && <AdminOrdersRejected />}
          {activeProductTab === '2' && <AdminOrdersAccepted/>}
        </div>
      </>
    );
  }
}

export default AdminHomePage;
