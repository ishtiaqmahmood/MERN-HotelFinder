import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await axios.post(`http://localhost:8000/api/login`, {
        email,
        password,
      });
      //console.log(res);
      if (res.data) {
        console.log(
          "SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===> "
        );
        // console.log(res.data);
        // save user and token to localstorage
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        // save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      //if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Login</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
