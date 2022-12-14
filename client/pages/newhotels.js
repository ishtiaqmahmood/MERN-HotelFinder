import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AlgoliaPlaces from "algolia-places-react";
import Image from "next/image";
import { DatePicker, Select } from "antd";
import moment from "moment/moment";
import { createHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import TopNav from "../components/TopNav";

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  appKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  countries: ["bd"],
};

const { Option } = Select;

const newhotels = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  const [location, setLocation] = useState("");

  // destructuring variables from state
  const { title, content, image, price, from, to, bed } = values;

  const ProtectedRoute = () => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("auth");
      if (!item) {
        return Router.push("/");
      }
    }
  };

  useEffect(() => {
    ProtectedRoute();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("bed", bed);
    hotelData.append("from", from);
    hotelData.append("to", to);

    console.log([...hotelData]);

    try {
      let response = await createHotel(token, hotelData);
      console.log("Hotel Create Response", response);
      toast.success("New hotel is posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const hotelForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="content"
          className="form-control m-2"
          value={content}
        />
        <AlgoliaPlaces
          className="form-control mx-2 "
          defaultValue={location}
          options={config}
          onChange={({ suggestion }) => setLocation(suggestion.value)}
          style={{ height: "50px" }}
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />
        {/* <input
          type="number"
          name="bed"
          onChange={handleChange}
          placeholder="Bed"
          className="form-control m-2"
          value={bed}
        /> */}
        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Number of beds"
        >
          <Option key={1}>1</Option>
          <Option key={2}>2</Option>
          <Option key={3}>3</Option>
          <Option key={4}>4</Option>
        </Select>
      </div>
      <DatePicker
        placeholder="From date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <DatePicker
        placeholder="From date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
  return (
    <>
      <TopNav />
      <div className="container-fluid bg-danger p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            {hotelForm()}
          </div>
          <div className="col-md-2">
            <Image
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
              width="100"
              height="100"
            />
            {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default newhotels;
