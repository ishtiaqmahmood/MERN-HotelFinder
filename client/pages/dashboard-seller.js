import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import TopNav from "../components/TopNav.js";
import DashboardNav from "../components/DashboardNav.js";
import ConnectNav from "../components/ConnectNav.js";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe.js";
import { toast } from "react-toastify";

const seller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

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

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res); // get login link
    } catch (err) {
      console.log(err);
      toast.error("Stripe connect failed, Try again");
      setLoading(false);
    }
  };

  const connected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Hotels</h2>
          </div>
          <div className="col-md-2">
            <Link href="/newhotels">
              <button className="btn btn-primary">+ Add New</button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  const notConnected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to post rooms</h4>
            <p className="lead">
              MERN partners with stripe to transfer earnings to your bank
              accounts
            </p>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : "Setup Payouts"}
            </button>
            <p className="text-muted">
              <small>
                You'll be redirect to Stripe to complete the onboarding process.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <TopNav />
      <div className="container-fluid bg-secondary p-5 text-center">
        <ConnectNav />
      </div>
      <div className="container-fluid p-2">
        <DashboardNav />
      </div>
      {/* {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()} */}
      {connected()}
    </div>
  );
};

export default seller;
