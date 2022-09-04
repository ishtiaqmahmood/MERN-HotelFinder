import axios from "axios";

export const createConnectAccount = async (token) => {
  await axios.post(
    `http://localhost:8000/api/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
