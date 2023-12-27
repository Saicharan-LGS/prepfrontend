import Toast from "../utlis/toast";
const CustomerButton = ({ id, amount, fetchProducts, fetchTotalAmount }) => {
  // Set the initial value as a string '1'
  const token = sessionStorage.getItem("token");
  const handleSubmit = async (id) => {
    // Create an object with the data you want to send
    const requestData = {
      status: 7,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}declineOrder/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData), // Stringify the data
        }
      );

      if (response.ok) {
        fetchProducts();
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
      } else {
      }
    } catch (error) {}
  };

  const handleSubmit1 = async () => {
    try {
      const amount2 = {
        amount: amount,
      };
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}acceptOrder/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(amount2),
        }
      );

      if (response.ok) {
        fetchProducts();
        fetchTotalAmount();
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
      } else {
      }
    } catch (error) {}
  };

  const onClickDecline = (e) => {
    const status = "1"; // Set the status here
    handleSubmit(e.target.value, status);
    // window.location.reload();
  };

  const onClickReceived = (e) => {
    const status = "2"; // Set the status here
    handleSubmit1(e.target.value, status);
    // window.location.reload();
  };

  return (
    <>
      <button
        value={id}
        onClick={onClickReceived}
        className="admin-order-accepted-received-button"
      >
        Accept
      </button>
      <button
        value={id}
        onClick={onClickDecline}
        className="admin-order-accepted-declined-button"
      >
        Decline
      </button>
    </>
  );
};

export default CustomerButton;
