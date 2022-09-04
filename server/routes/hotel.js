import express from "express";
import formidable from "express-formidable";
import { createHotel, hotels } from "../controllers/hotel";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/create-hotel", requireSignin, formidable(), createHotel);
router.get("/hotels", hotels);

module.exports = router;
