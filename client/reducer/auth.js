import { useEffect, useState } from "react";

let userState;
if (typeof window !== "undefined") {
  if (window.localStorage.getItem("auth")) {
    userState = JSON.parse(window.localStorage.getItem("auth"));
  } else {
    userState = null;
  }
}

// create reducer functions
const authReducer = (state = { userState }, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
