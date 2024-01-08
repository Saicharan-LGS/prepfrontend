import React, { useEffect, useState } from "react";
import "./index.css";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

function Wallet({ totalAmount }) {
  const [products, setProducts] = useState([]);
  const [productsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("credit");
  const [orderId, setOrderId] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    console.log(products);
    const filtered = products.filter((product) => {
      console.log(invoiceStatusFilter);
      const statusMatch = product.type === invoiceStatusFilter;
      console.log(statusMatch);
      const productIdMatch =
        product.order_ids && product.order_ids.toString().includes(orderId);
      console.log(productIdMatch);
      return productIdMatch && statusMatch;
      // return statusMatch;
    });

    setFilteredProducts(filtered);
  }, [products, orderId, invoiceStatusFilter]);
  console.log(filteredProducts, "filtered");

  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${FETCH_URL}gettransaction`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data);
        setLoading(false);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log(currentProducts, filteredProducts);
  const NextButton =
    indexOfLastProduct >= filteredProducts.length
      ? `pagination-arrow-container disable-previous-next-button`
      : `pagination-arrow-container`;
  const previousButton =
    currentPage === 1
      ? `pagination-arrow-container disable-previous-next-button`
      : `pagination-arrow-container`;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = (e) => {
    setOrderId(e.target.value);
    setCurrentPage(1); // Reset pagination when changing search filter
  };
  return (
    <div className="admin-order-accepted-product-list">
      <h2 className="admin-order-accepted-order-list-heading">Transactions</h2>
      <div className="admin-order-accepted-search-filter-input-container">
        <input
          type="text"
          name="orderid"
          value={orderId}
          onChange={handleSearch}
          placeholder="Search by Name / Order ID"
          required
          className="admin-order-accepted-search-filter-input"
        />
        <select
          value={invoiceStatusFilter}
          onChange={(e) => setInvoiceStatusFilter(e.target.value)}
          className="admin-order-accepted-search-filter-input"
        >
          <option value="debit">Debited</option>
          <option value="credit">Credited</option>
        </select>
      </div>
      <div className="admin-order-accepted-table-container">
        <div className="admin-order-accepted-category-types">
          <p className="customer-list-table-row">Transaction Id</p>
          <p className="customer-list-table-row">Order IDs</p>
          <p className="customer-list-table-row">Amount</p>
          <p className="customer-list-table-row">Transaction Date</p>
          <p className="customer-list-table-row">Type</p>
        </div>

        {currentProducts.length > 0 ? (
          <>
            {currentProducts.map((eachProduct) => (
              <div
                className="admin-order-accepted-display-of-products-container"
                key={eachProduct.id}
              >
                {/* Display your product details */}
                <p className="customer-list-table-row">{eachProduct.id}</p>
                <p className="customer-list-table-row">
                  {eachProduct.order_ids}
                </p>
                <p className="customer-list-table-row">{eachProduct.amount}</p>

                <p className="customer-list-table-row">
                  {new Date(eachProduct.transaction_date).toLocaleDateString()}
                </p>
                <p
                  className={`customer-list-table-row ${
                    eachProduct.type === "debit"
                      ? "status-debit"
                      : "status-credit"
                  }`}
                >
                  {eachProduct.type}
                </p>
              </div>
            ))}
            <div className="pagination-button-container">
              <BsFillArrowLeftCircleFill
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage <= 1}
                className={previousButton}
              />
              <span>Page {currentPage}</span>
              <BsFillArrowRightCircleFill
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastProduct >= products.length}
                className={NextButton}
              />
            </div>
          </>
        ) : (
          <h4>No staff</h4>
        )}
      </div>
    </div>
  );
}

export default Wallet;
