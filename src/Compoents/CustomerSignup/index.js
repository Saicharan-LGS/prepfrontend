// import React, { useState } from "react";
// import "./index.css";



// const Customersignup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Construct the request object with the POST method and the request body as JSON
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     };

//     // Send the POST request using the fetch API
//     fetch("http://localhost:3009/api/v1/registration", requestOptions)
//       .then((response) => {
//         if (response.status === 201) {
//           return response.json();
//         } else {
//           throw new Error(`Failed with status: ${response.status}`);
//         }
//       })
//       .then((data) => {
//         console.log(data);
//         // Handle success, e.g., redirect the user to a login page.
//       })
//       .catch((error) => {
//         console.error(error);
//         // Handle error, e.g., display an error message to the user.
//       });
//   };

  

//   return (
//     <div className="customer-signin-div-container">
//       <div className="customer-signin-form-main-container">
//         <center>
//           <h2 className="customer-signin-form-heading-container">
//             Customer Signup
//           </h2>
//         </center>
//         <form onSubmit={handleSubmit} className="customer-singin-form-container">
//           <div className="customer-signin-form-group-container">
//             <label className="customer-singnin-form-lable-container">Name:</label>
//             <input
//               type="text"
//               name="name"
//               className="customer-signin-input-container"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="customer-signin-form-group-container">
//             <label className="customer-singnin-form-lable-container">
//               Email:
//             </label>
//             <input
//               type="email"
//               name="email"
//               className="customer-signin-input-container"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="customer-signin-form-group-container">
//             <label className="customer-singnin-form-lable-container">
//               Password:
//             </label>
//             <input
//               type="password"
//               name="password"
//               className="customer-signin-input-container"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <center>
//             <button
//               className="customer-signin-form-button-container"
//               type="submit"
//             >
//               Sign In
//             </button>
//           </center>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Customersignup;

import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
const Customersignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setBackendError(null); // Clear any previous backend errors

    // Validate the form data
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    

    // Construct the request object with the POST method and the request body as JSON
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    // Send the POST request using the fetch API
    fetch("http://localhost:3009/api/v1/registration", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(`Failed with status: ${response.status}`);
        }
      })
      .then((data) => {
        console.log(data);
        navigate("/CustomerLogin")// Handle success, e.g., redirect the user to a login page.
      })
      .catch((error) => {
        setBackendError("An error occurred while processing your request.");
        console.error(error);
      });
  };

  return (
    <div className="customer-signin-div-container">
      <div className="customer-signin-form-main-container">
        <center>
          <h2 className="customer-signin-form-heading-container">
            Customer Signup
          </h2>
        </center>
        <form onSubmit={handleSubmit} className="customer-singin-form-container">
          <div className="customer-signin-form-group-container">
            <label className="customer-singnin-form-lable-container">Name:</label>
            <input
              type="text"
              name="name"
              className="customer-signin-input-container"
              value={formData.name}
              onChange={handleInputChange}
              
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="customer-signin-form-group-container">
            <label className="customer-singnin-form-lable-container">
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="customer-signin-input-container"
              value={formData.email}
              onChange={handleInputChange}
              
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="customer-signin-form-group-container">
            <label className="customer-singnin-form-lable-container">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="customer-signin-input-container"
              value={formData.password}
              onChange={handleInputChange}
              
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          {backendError && <p className="error-message">{backendError}</p>}
          <center>
            <button
              className="customer-signin-form-button-container"
              type="submit"
            >
              Sign Up
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Customersignup;

