import { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment/moment";
import axios from "axios";
import { useRouter } from "next/router";
import { diffDays } from "../actions/hotel";
import TopNav from "../components/TopNav";

const hotel = () => {
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");
  const router = useRouter();

  const loadSellerHotel = async () => {
    const hotelId = router.query.name;
    let res = await axios.get(`http://localhost:8000/api/hotel/${hotelId}`);
    console.log(res);
    setHotel(res.data);
    setImage(`http://localhost:8000/api/hotel/image/${res.data._id}`);
  };

  useEffect(() => {
    if (router.isReady) {
      loadSellerHotel();
    }
  }, [router.isReady]);

  const ProtectedRoute = () => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("auth");
      if (!item) {
        return router.push("/");
      }
    }
  };

  useEffect(() => {
    ProtectedRoute();
  }, []);
  return (
    <>
      <TopNav />
      <div className="container-fluid bg-info p-5 text-center">
        <h2>{hotel.title}</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            {image && (
              <Image
                src={image}
                alt={hotel.title}
                className="img img-fluid m-2"
                width="600"
                height="400"
              />
            )}
          </div>
          <div className="col-md-6">
            <br />
            <b>{hotel.content}</b>
            <p className="alert alert-info mt-3">{hotel.price} Taka</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
          </div>
        </div>
      </div>
    </>
  );
};

export default hotel;
