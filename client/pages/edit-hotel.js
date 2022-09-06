import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AlgoliaPlaces from "algolia-places-react";
import Image from "next/image";
import { DatePicker, Select } from "antd";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import TopNav from "../components/TopNav";

const { Option } = Select;
const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  appKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  countries: ["bd"],
};

const editHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const router = useRouter();

  const [values, setValues] = useState({
    title: "",
    content: "",
    price: "",
    from: "",
    to: "",
    bed: "",
    location: "",
  });
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  // destructuring variables from state
  const { title, content, price, location, from, to, bed } = values;

  const loadSellerHotel = async () => {
    const hotelId = router.query.name;
    let res = await axios.get(`http://localhost:8000/api/hotel/${hotelId}`);
    console.log(res);
    setValues({ ...values, ...res.data });
    setPreview(`http://localhost:8000/api/hotel/image/${res.data._id}`);
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

    try {
      //let res = await updateHotel(token, hotelData, router.query.name);
      const hotelId = router.query.name;
      let res = await axios.put(
        `http://localhost:8000/api/update-hotel/${hotelId}`,
        hotelData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Hotel update res >>> ", res);
      toast.success(`${res.data.title} is updated`);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.err);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const hotelEditForm = () => (
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
        {location && location.length && (
          <AlgoliaPlaces
            className="form-control mx-2 "
            defaultValue={location}
            options={config}
            onChange={({ suggestion }) =>
              setValues({ ...values, location: suggestion.value })
            }
            style={{ height: "50px" }}
          />
        )}
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Number of beds"
          value={bed}
        >
          <Option key={1}>1</Option>
          <Option key={2}>2</Option>
          <Option key={3}>3</Option>
          <Option key={4}>4</Option>
        </Select>
      </div>
      {from && (
        <DatePicker
          defaultValue={moment(from, "YYYY-MM-DD")}
          placeholder="From date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, from: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
      )}
      {to && (
        <DatePicker
          defaultValue={moment(to, "YYYY-MM-DD")}
          placeholder="From date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, to: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
      )}
      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );

  return (
    <>
      <TopNav />
      <div className="container-fluid bg-info p-5 text-center">
        <h2>Edit hotel</h2>
      </div>
      <div className="cotainer-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            {hotelEditForm()}
          </div>
          <div className="col-md-2">
            <Image
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
              width="100"
              height="100"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default editHotel;
