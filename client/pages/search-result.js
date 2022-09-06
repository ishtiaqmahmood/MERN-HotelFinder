import React, { useState, useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
import TopNav from "../components/TopNav";
import SmallCard from "../components/cards/SmallCard";

const SearchResult = () => {
  // state
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchBed, setSearchBed] = useState("");
  const [hotels, setHotels] = useState("");

  const searchListing = async () => {
    const { location, date, bed } = queryString.parse(window.location.search);
    // console.table({ location, date, bed });
    const res = await axios.post(`http://localhost:8000/api/search-listings`, {
      location,
      date,
      bed,
    });
    console.log("Search results >>> ", res.data);
    setHotels(res.data);
    console.log(hotels[0]);
  };

  // when component mounts, get search params from url and use to send search query to backend

  useEffect(() => {
    searchListing();
  }, [window.location.search]);

  return (
    <>
      <TopNav />
      <div className="container">
        <div className="row">
          {hotels && hotels.map((h) => <SmallCard key={h._id} h={h} />)}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
