import Toast from "../utlis/toast";
const DispatchButton = ({ id, status, fetchProducts, orderIds }) => {
  // Set the initial value as a string '1'
 
  const token = sessionStorage.getItem("token");
  const handleSubmit = async () => {
    // Create an object with the data you want to send
    if (status === "5") {
      alert("Invoice is not accepted. You can't dispatch order");
      return;
    } else if (status === "7") {
      alert("Invoice is Rejected by customer. You can't dispatch order");
      return;
    
    } else if (status === "8") {
      alert("Order is already dispatched");
      return;
    }

    const requestData = {
      status: 8,
      orderIds: orderIds,
    };

    try {
      console.log(id, "idsssssssssssssssssssssssss");
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}dispatch/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData), // Stringify the data
        }
      );
      const data = await response.json();
      if (response.ok) {
        fetchProducts();

        Toast.fire({
          icon: "success",
          title: data.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (error) {}
  };

  const onClickDispatch = (e) => {
    handleSubmit();
  };

  return (
    <>
      <button
        value={id}
        onClick={onClickDispatch}
        className="admin-order-accepted-received-button"
      >
        Dispatch
      </button>
    </>
  );
};

export default DispatchButton;
