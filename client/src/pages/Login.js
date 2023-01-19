import { useState } from "react";
import Form from "../components/common/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import AuthConsumer from "../hooks/useAuth";
import user from "../services/userService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputValues, setInputValues] = useState({});
  const [error, setError] = useState({});

  const [, dispatch] = AuthConsumer();
  const navigate = useNavigate();

  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  const handleSubmit = async (account) => {
    try {
      const { isAdmin } = await user.login(account);

      dispatch({ type: isAdmin ? "admin" : "login" });
      navigate(-1);
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <Form
      inputs={[
        { name: "email", label: "email" },
        { name: "password", label: "Contraseña", type: "password" },
      ]}
      onSubmit={handleSubmit}
      header="Acceso a cuenta"
      submitLabel="Login"
      validSchema={schema}
      inputValuesState={[inputValues, setInputValues]}
      errorState={[error, setError]}
    />
  );
};

export default Login;
