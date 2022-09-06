import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Register } from "../actions/auth";
import Link from "next/link";

function register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      const response = await Register({
        name,
        email,
        password,
      });
      console.log(response);
      toast.success("Registration success. Please login.");
      router.push("/login");
    } catch (err) {
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };
  return (
    <>
      <div className="container-fluid bg-warning p-5 text-center">
        <h1>Register Page</h1>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <RegisterForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            <br />
            <Link href="/login">
              <a>Are you a registed user? Click here for Login</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default register;
