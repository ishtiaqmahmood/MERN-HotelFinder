import express from "express";
import formidable from "express-formidable";
import {
  createHotel,
  hotels,
  hotelImage,
  sellerHotels,
  removeHotel,
  getSingleHotelData,
} from "../controllers/hotel";
import { requireSignin, hotelOwner } from "../middlewares";

const router = express.Router();

router.post("/create-hotel", requireSignin, formidable(), createHotel);
router.get("/hotels", hotels);
router.get("/hotel/image/:hotelId", hotelImage);
router.get("/seller-hotels", requireSignin, sellerHotels);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, removeHotel);
router.get("/hotel/:hotelId", getSingleHotelData);

module.exports = router;
