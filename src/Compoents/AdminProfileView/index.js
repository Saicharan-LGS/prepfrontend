import { useState, useEffect } from "react";

import "./index.css";
import { ImCancelCircle } from "react-icons/im";
import { Box, Modal } from "@mui/material";
import CustomerProfileEdit from "../CustomerProfileEdit";
import CustomerUpdatePassword from "../CustomerUpdatePassword";
import AdminUpdatePassword from "../AdminUpdatePassword";
import AdminProfileEdit from "../AdminProfileEdit";

function AdminProfileView({ fetchProducts1 }) {
  const [userDetatils, setUserDetails] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const REACT_APP_PDF_URL = process.env.REACT_APP_PDF_URL;
  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${FETCH_URL}getSpecificStaffDetails`, {
        method: "GET",
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      }); // Replace with your API endpoint
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data.staff);
      } else {
        setUserDetails("");
      }
    } catch (error) {
      setUserDetails("");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCloseModal = () => {
    setIsEditOpen(false);
    setIsModelOpen(false);
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handlePassword = () => {
    setIsModelOpen(true);
  };


  return (
    <>
      {/* <ImCancelCircle onClick={onClose} style={{fontSize:"24px", color:"#212d45",cursor:"pointer",marginBottom:"10px"}}/> */}
      <div className="customer-profile-view-main-container">
        <div className="customer-profile-view-sub-container">
          <div className="customer-profile-view-top-container">
            {/* <button className="logout-button">Logout</button> */}

            <div className="customer-profile-view-details-display-flex">
              <div className="customer-profile-view-profile-image-container">
                <img
                  src={`${REACT_APP_PDF_URL}${
                    userDetatils && userDetatils.profile
                  }`}
                  alt=""
                  className="customer-profile-view-profile-image"
                />
                {/* <input type="file" className="customer-profile-view-file-upload"/> */}
              </div>
              <div>
                <div className="customer-profile-view-detail-container">
                  <p className="customer-profile-view-detail-container-name">
                    {userDetatils && userDetatils.name}
                  </p>
                </div>
                <div className="customer-profile-view-detail-container">
                  <p className="customer-profile-view-detail-container-name">
                    {userDetatils && userDetatils.email}
                  </p>
                </div>
                <div className="customer-profile-view-detail-container">
                  <p
                    className="customer-profile-view-update-password"
                    onClick={handlePassword}
                  >
                    Update Password
                  </p>
                </div>
                {/* <div className="customer-profile-view-detail-container">
                <p className="customer-profile-view-detail-container-name">
                  {userDetatils && userDetatils.mobile_number}
                </p>
              </div> */}
                {/* <div className="customer-profile-view-detail-container">
                <p className="customer-profile-view-detail-container-name">
                  {userDetatils && userDetatils.Address}
                </p>
              </div> */}
              </div>
              
            </div>
            <div>
            <button
                className="customer-profile-view-edit-button"
                onClick={handleEdit}
              >
                Edit
              </button>
              </div>
          </div>
        </div>
      </div>
      <Modal
        open={isEditOpen}
        onClose={handleCloseModal}
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "300px",
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
          <AdminProfileEdit
            onClose={handleCloseModal}
            fetchProducts={fetchProducts}
            fetchProducts1={fetchProducts1}
          />
        </Box>
      </Modal>
      <Modal
        open={isModelOpen}
        onClose={handleCloseModal}
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "300px",
            top: "50%",
            left: "50%",
            height: "350px",
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
          <AdminUpdatePassword onClose={handleCloseModal} />
        </Box>
      </Modal>
    </>
  );
}
export default AdminProfileView;
