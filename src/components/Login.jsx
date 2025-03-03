import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setErrorMessage(err.response.data);
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setErrorMessage(err.response.data);
      console.log(err);
    }
  };

  return (
    <div>
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-auto my-20">
        <legend className="fieldset-legend">
          {isLoginPage ? "Login" : "Sign Up"}
        </legend>

        {!isLoginPage && (
          <>
            {" "}
            <label className="fieldset-label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="fieldset-label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="fieldset-label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="fieldset-label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="font-medium text-red-500">{errorMessage}</p>

        <button
          className="btn btn-neutral mt-4"
          onClick={isLoginPage ? handleLogin : handleSignUp}
        >
          {isLoginPage ? "Login" : "Sign Up"}
        </button>

        <p className="mx-auto mt-5">
          <span>{isLoginPage ? "New to DevTinder? " : "Already a user? "}</span>
          <span
            className="cursor-pointer text-blue-700 font-bold"
            onClick={() => setIsLoginPage((value) => !value)}
          >
            {isLoginPage ? " Sign Up" : " Log In"}
          </span>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
