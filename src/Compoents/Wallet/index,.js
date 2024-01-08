
import React, { useEffect, useState } from "react";
const [filteredProducts, setFilteredProducts] = useState([]);
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
function Wallet () {
    const [products, setProducts] = useState([]);
    const [productsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const FETCH_URL = process.env.REACT_APP_FETCH_URL;

    const fetchProducts = async () => {
        try {
          const token = sessionStorage.getItem("token");
          const response = await fetch(`${FETCH_URL}staffmembers`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setProducts(data.staffMembers);
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
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );
    
  return (
    <div>
      <div>
        <h4>Balance:</h4>
      </div>
      <p>Transaction List:</p>
      <div className="admin-order-accepted-table-container">
          <div className="admin-order-accepted-category-types">
            <p className="customer-list-table-row">Staff Id</p>
            <p className="customer-list-table-row">Name</p>
            <p className="customer-list-table-row">Role</p>
            <p className="customer-list-table-row">Email</p>
            <p className="customer-list-table-row">Status</p>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              {currentProducts.map((eachProduct) => {
                return (
                  <div
                    className="admin-order-accepted-display-of-products-container"
                    key={eachProduct.id}
                  >
                    <p className="customer-list-table-row">{eachProduct.id}</p>
                    <p className="customer-list-table-row">
                      {eachProduct.name}
                    </p>
                    <p className="customer-list-table-row">
                      {eachProduct.role}
                    </p>
                    <p className="customer-list-table-row">
                      {eachProduct.email}
                    </p>
                    <div className="customer-list-table-row">
                      <input
                        type="checkbox"
                        className="customer-list-table-row-input"
                        checked={eachProduct.status === 1 ? true : false}
                      />
                    </div>
                  </div>
                );
              })}
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
};

export default Wallet;
