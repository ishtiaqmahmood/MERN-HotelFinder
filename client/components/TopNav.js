import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const TopNav = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { auth } = useSelector((state) => ({ ...state }));

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    router.push("/login");
  };
  return (
    <div className="nav bg-light d-flex justify-content-between text-decoration-none">
      <Link className="nav-link" href="/">
        <a className="text-decoration-none">Home</a>
      </Link>
      {auth !== null && (
        <div>
          <Link className="nav-link" href="/dashboard">
            <a className="text-decoration-none">dashboard</a>
          </Link>
        </div>
      )}
      {auth !== null && (
        <div>
          <div className=" nav-link pointer" onClick={logout}>
            <a className="text-decoration-none">Logout</a>
          </div>
        </div>
      )}
      {auth === null && (
        <div>
          <Link className="nav-link" href="/login">
            <a className="text-decoration-none">Login</a>
          </Link>
          <Link className="nav-link" href="/register">
            <a className="text-decoration-none">Register</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopNav;
