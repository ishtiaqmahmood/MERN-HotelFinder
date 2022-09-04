import React from "react";
import Link from "next/link";

const DashboardNav = () => {
  if (typeof window !== "undefined") {
    var active = window.location.pathname;
  }
  return (
    <ul className="nav nav-tabs">
      <li
        className={`nav-item nav-link ${active === "/dashboard" && "active"}`}
      >
        <Link
          className={`${active === "/dashboard" && "active"}`}
          href="/dashboard"
        >
          <a className="text-decoration-none">Hotels</a>
        </Link>
      </li>
      <li
        className={`nav-item nav-link ${
          active === "/dashboard-seller" && "active"
        }`}
      >
        <Link href="/dashboard-seller">
          <a className="text-decoration-none">Your Hotels</a>
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
