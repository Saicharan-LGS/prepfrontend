import React, { useState } from 'react';
import './index.css'

const ReceivedQuantity = ({ orderId,unit }) => {
  const [status, setStatus] = useState('');
  const [quantityReceived, setQuantityReceived] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/updateOrderQuantity/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          quantity_received: quantityReceived,
          unit: unit
        }),
      });

      if (response.ok) {
        console.log('Order status and quantity_received updated successfully');
        // Add any additional logic you want to perform after a successful update
      } else {
        console.error('Failed to update order status and quantity_received');
      }
    } catch (error) {
      console.error('Error updating order status and quantity_received:', error);
    }
  };

  return (
    <div className="received-quantity-main-container">
      <label className="received-quantity-label-name">
        Quantity Received:  
      </label>
      <input type="text" placeholder='Enter the Quantity received' className="received-quantity-input-field" value={quantityReceived} onChange={(e) => setQuantityReceived(e.target.value)} />
      <button onClick={handleUpdate} className="received-quantity-update-button">Update Order</button>
    </div>
  );
};

export default ReceivedQuantity;