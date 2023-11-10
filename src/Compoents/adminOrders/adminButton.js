import Toast from "../utlis/toast";
const DisplayAdminButton = (props) => {

  const handleSubmit = async (id, status) => {
    // Create an object with the data you want to send
    const requestData = {
      status: status,
    };
    console.log(requestData);
    const token=sessionStorage.getItem("token")
    try {
      console.log(requestData);
      const response = await fetch(
        `http://localhost:3009/api/v1/adminUpdateOrderStatus/${id}`,
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
        const data = await response.json()
        console.log("Product updated successfully");
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        props.fetchProducts();
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const onClickDecline = (e) => {
    const status = "1"; 
    handleSubmit(e.target.value, status);
   
  };

  const onClickReceived = (e) => {
    const status = "2"; // Set the status here
    console.log("Received called");
    handleSubmit(e.target.value, status);
  };

  return (
    <>
      <button
        value={props.id}
        onClick={onClickReceived}
        className="admin-order-accepted-received-button"
      >
        Accept
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
