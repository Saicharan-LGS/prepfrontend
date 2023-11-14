import Toast from "../utlis/toast";
const DisplayAdminButton = (props) => {

  const handleSubmit = async (id, status) => {
    // Create an object with the data you want to send
    const requestData = {
      status: status,
    };
    const token=sessionStorage.getItem("token")
    try {
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
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        props.fetchProducts();
      } else {
      }
    } catch (error) {
    }
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
