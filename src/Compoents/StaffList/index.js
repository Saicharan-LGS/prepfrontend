import React, { useEffect, useState } from "react";
import "./index.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Spinner from "../Spinner";
import Toast from "../utlis/toast";
import { TiEdit } from "react-icons/ti";
import { Box, Modal } from "@mui/material";
import EditStaffDetails from "../EditStaffDetails";

function StaffList({ openDetailPageComponent }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [orderId, setOrderId] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedStaff, setSelectedStaff] = useState(null);

  const [isModelOpen,setIsModelOpen] = useState(false)

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  const handleToggle = async (id, currentStatus, role1) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${FETCH_URL}update-staff-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: !currentStatus, role: role1 }),
      });

      if (response.ok) {
        // Handle success, maybe update the local state

        response.json().then((data) => {
          Toast.fire({
            icon: "success",
            title: data.message,
          });
        });
        fetchProducts();
        // You may want to update the local state here if needed
      } else {
        response.json().then((data) => {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        });
        console.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    const filtered = products.filter((product) => {
      const productIdMatch = product.id.toString().includes(orderId);
      const productNameMatch = product.name.toLowerCase().includes(orderId);
      return productIdMatch || productNameMatch;
    });

    setFilteredProducts(filtered);
  }, [products, orderId, currentPage]);

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

  const handleSearch = (e) => {
    setOrderId(e.target.value);
    setCurrentPage(1);
  };

  const NextButton =
    indexOfLastProduct >= filteredProducts.length
      ? `pagination-arrow-container disable-previous-next-button`
      : `pagination-arrow-container`;
  const previousButton =
    currentPage === 1
      ? `pagination-arrow-container disable-previous-next-button`
      : `pagination-arrow-container`;

  const handleEdit=(staffData)=>{
    console.log(staffData,"staffDatastaffData")
    setSelectedStaff(staffData)
    setIsModelOpen(true)
  }

  const handleCloseModal = () => {
    
    
    setIsModelOpen(false);
  };


  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin-order-accepted-product-list">
          <h2 className="admin-order-accepted-order-list-heading">
            Staff List
          </h2>
          <input
            type="text"
            name="orderid"
            value={orderId}
            onChange={handleSearch}
            placeholder="Search by Name / Order ID"
            required
            className="admin-order-accepted-search-filter-input"
          />
          <div className="admin-order-accepted-table-container">
            <div className="admin-order-accepted-category-types">
              <p className="customer-list-table-row">Staff Id</p>
              <p className="customer-list-table-row">Name</p>
              <p className="customer-list-table-row">Role</p>
              <p className="customer-list-table-row">Email</p>
              <p className="customer-list-table-row">Status</p>
              <p className="customer-list-table-row">Edit</p>
            </div>

            {filteredProducts.length > 0 ? (
              <>
                {currentProducts.map((eachProduct) => {
                  return (
                    <div
                      className="admin-order-accepted-display-of-products-container"
                      key={eachProduct.id}
                    >
                      <p className="customer-list-table-row">
                        {eachProduct.id}
                      </p>
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
                          onChange={() =>
                            handleToggle(
                              eachProduct.id,
                              eachProduct.status === 1,
                              eachProduct.role
                            )
                          }
                        />
                      </div>
                      <div className="customer-list-table-row">
                        <TiEdit onClick={()=>handleEdit(eachProduct)}  style={{fontSize:"28px",color:"#ff0000",cursor:"pointer"}}/>
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
        
      )}
       <Modal
        open={isModelOpen}
        onClose={handleCloseModal}
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "550px",
            top: "50%",
            left: "50%",
            
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "8px",
            p: 3,
          }}
        >
          {/* <DimensionUpdatePage
                updateId={updateId}
                onClose={handleCloseModal}
                fetchProducts={fetchProducts}
              /> */}
          <EditStaffDetails onClose={handleCloseModal} staff = {selectedStaff} />
        </Box>
      </Modal>
    </>
  );
}

export default StaffList;
