import React, { useState } from 'react';
import "./index.css"

const StaffSignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    role: 'user',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="signup-main-form-container">
        <center>
      <h2 className='signup-form-heading-container'>Signup</h2>
      </center>
      <form onSubmit={handleSubmit} className="signup-form-container">
        <div className="signup-whole-form-contaner">
          <label className='signup-form-lable-container'>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="signup-whole-form-contaner">
          <label className='signup-form-lable-container'>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="signup-whole-form-contaner">
          <label className='signup-form-lable-container'>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="signup-whole-form-contaner">
          <label className='signup-form-lable-container'>Role:</label>
          <select name="role" value={formData.role} onChange={handleInputChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <center>  
        <button className='signup-form-button-container' type="submit">Signup</button>
        </center>
      </form>
    </div>
  );
};

export default StaffSignupPage;