import axios from "axios";

export const Register = async (user) => {
  await axios.post(`http://localhost:8000/api/register`, user);
};

export const Login = async (user) => {
  await axios.post(`http://localhost:8000/api/login`, user);
};
