import Hotel from "../models/hotel";
import fs from "fs";

export const createHotel = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;
    let hotel = new Hotel(fields);
    hotel.postedBy = req.auth._id;
    // handle image
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    hotel.save((err, result) => {
      if (err) {
        console.log("Saving hotel error => ", err);
        res.status(400).send("Error Saving");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const hotels = async (req, res) => {
  let all = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  res.json(all);
};

export const hotelImage = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set("Content-Type", hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};

export const sellerHotels = async (req, res) => {
  let all = await Hotel.find({ postedBy: req.auth._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.send(all);
};

export const removeHotel = async (req, res) => {
  let removed = await Hotel.findByIdAndDelete(req.params.hotelId)
    .select("-image.data")
    .exec();
  res.json(removed);
};

export const getSingleHotelData = async (req, res) => {
  let getdata = await Hotel.findById(req.params.hotelId)
    .select("-image.data")
    .exec();
  console.log("Single hotel data >>> ", getdata);
  res.json(getdata);
};
