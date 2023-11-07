import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
  const [login, setLogin] = useState("customer");
  const navigate = useNavigate();

  const LoginPage = () => {
    if (login === "customer") {
      navigate("/CustomerLogin");
    } else {
      navigate("/staffsignin");
    }
  };

  const onChangeSelect = (e) => {
    setLogin(e.target.value);
  };

  return (
    <div>
      <h1>Login As</h1>
      <select onChange={onChangeSelect}>
        <option value="customer">Customer</option>

        <option value="Staff">Staff</option>
      </select>
      <button onClick={LoginPage}>Continue</button>
    </div>
  );
}
export default Login;
