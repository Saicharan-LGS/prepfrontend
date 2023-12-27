import Toast from "../utlis/toast";
const DisplayAdminButton = (props) => {
  const handleSubmit = async (id, status, unit) => {
    // Create an object with the data you want to send
    const requestData = {
      status: status,
    };
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}adminUpdateOrderStatus/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData), // Stringify the data
        }
      );

      if (response.ok) {
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        props.fetchProducts();
      } else {
      }
    } catch (error) {}
  };

  const onClickDecline = (e) => {
    const status = "1";
    handleSubmit(e.target.value, status);
  };

  const onClickReceived = (e) => {
    const status = "2"; // Set the status here
    handleSubmit(e.target.value, status);
  };

  return (
    <>
      <button
        value={props.id}
        onClick={onClickReceived}
        className="admin-order-accepted-received-button"
      >
        Received
      </button>
      <button
        value={props.id}
        onClick={onClickDecline}
        className="admin-order-accepted-declined-button"
      >
        Decline
      </button>
    </>
  );
};

export default DisplayAdminButton;




// import React, { useState } from 'react';

// const OrderUpdateForm = ({ orderId }) => {
//   const [status, setStatus] = useState('');
//   const [quantityReceived, setQuantityReceived] = useState('');

//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(`/api/updateOrderQuantity/${orderId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           status,
//           quantity_received: quantityReceived,
//           unit: // provide the unit value here,
//         }),
//       });

//       if (response.ok) {
//         console.log('Order status and quantity_received updated successfully');
//         // Add any additional logic you want to perform after a successful update
//       } else {
//         console.error('Failed to update order status and quantity_received');
//       }
//     } catch (error) {
//       console.error('Error updating order status and quantity_received:', error);
//     }
//   };

//   return (
//     <div>
//       <label>
//         Status:
//         <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Quantity Received:
//         <input type="text" value={quantityReceived} onChange={(e) => setQuantityReceived(e.target.value)} />
//       </label>
//       <br />
//       <button onClick={handleUpdate}>Update Order</button>
//     </div>
//   );
// };

// export default OrderUpdateForm;