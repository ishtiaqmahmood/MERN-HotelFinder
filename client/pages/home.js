import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SmallCard from "../components/cards/SmallCard";
import { useRouter } from "next/router";
import Search from "../components/Search";

function Home() {
  const [hotels, setHotels] = useState([]);

  const loadAllHotels = async () => {
    let res = await axios.get(`http://localhost:8000/api/hotels`);
    //console.log(res);
    setHotels(res.data);
  };
  useEffect(() => {
    loadAllHotels();
  }, []);
  return (
    <>
      <div className="container-fluid bg-danger p-5 text-center">
        <h1>All Hotels</h1>
      </div>
      <br />
      <br />
      <Search />
      <div className="container-fluid">
        {/* <pre>{JSON.stringify(hotels, null, 4)}</pre> */}
        {hotels.map((h) => (
          <SmallCard key={h._id} h={h} />
        ))}
      </div>
    </>
  );
}

export default Home;
