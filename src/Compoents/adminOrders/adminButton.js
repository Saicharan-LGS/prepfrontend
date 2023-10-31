import { useState } from "react";
import "./index.css";

const DisplayAdminButton = (props) => {

    const [product, setProduct] = useState();

const handeSubmit=async(id)=>{  
    try {
        const response = await fetch(`http://localhost:3000/updateproduct/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
  
        if (response.ok) {
          console.log('Product updated successfully');
        } else {
          console.error('Failed to updated product');
        }
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  const onClickDecline = (e) => {
    console.log(e.target.value)
    setProduct("declined")
    handeSubmit(e.target.value)
  };
  const onClickRecieved=(e)=>{
    console.log(e.target.value)
    setProduct("recieved")
    handeSubmit(e.target.value)
  }
  return (
    <div className="admin-orders-product-buttons-container">
      <>
        <button value={props.id}
          onClick={onClickDecline}
          className="admin-orders-product-decline-button"
        >
          Decline
        </button>
      </>
      <button value={props.id} onClick={onClickRecieved} className="admin-orders-product-accept-button">Recieved</button>
    </div>
  );
};

export default DisplayAdminButton;
