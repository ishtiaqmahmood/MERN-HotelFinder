import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import TopNav from "../components/TopNav";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";

const dashboard = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;

  const ProtectedRoute = () => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("auth");
      if (!item) {
        return Router.push("/");
      }
    }
  };

  useEffect(() => {
    ProtectedRoute();
  }, []);
  return (
    <>
      <TopNav />
      <div className="container-fluid bg-warning p-5 text-center">
        <ConnectNav />
      </div>
      <div className="container-fluid p-2">
        <DashboardNav />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Hotels</h2>
          </div>
          <div className="col-md-2">
            <Link href="/">
              <button className="btn btn-primary">Browse Hotels</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
