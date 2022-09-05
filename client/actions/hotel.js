import axios from "axios";

export const createHotel = async (token, data) => {
  await axios.post(`http://localhost:8000/api/create-hotel`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const allHotels = async () => {
  await axios.get(`http://localhost:8000/api/hotels`);
};

export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
};

export const sellerHotels = async (token) =>
  await axios.get(`http://localhost:8000/api/seller-hotels`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteHotel = async (token, hotelId) =>
  await axios.delete(`http://localhost:8000/api/delete-hotel/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getSingleHotelData = async (hotelId) => {
  await axios.get(`http://localhost:8000/api/hotel/${hotelId}`);
};
