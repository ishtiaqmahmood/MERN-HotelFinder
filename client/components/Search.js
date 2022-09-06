import React, { useState } from "react";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AlgoliaPlaces from "algolia-places-react";
import moment from "moment";
import { useRouter } from "next/router";

// destructure values from ant component
const { RangePicker } = DatePicker;
const { Option } = Select;

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  appKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  countries: ["bd"],
};

const Search = () => {
  const router = useRouter();
  // state
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [bed, setBed] = useState("");

  const handleSubmit = () => {
    //router.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
    router.push({
      pathname: `/search-result/`,
      query: { location: `${location}`, date: `${date}`, bed: `${bed}` },
    });
  };

  return (
    <>
      <div className="d-flex pb-4">
        <div className="w-100">
          <AlgoliaPlaces
            placeholder="Location"
            defaultValue={location}
            options={config}
            onChange={({ suggestion }) => setLocation(suggestion.value)}
            style={{ height: "50px" }}
          />
        </div>
        <RangePicker
          className="w-100"
          onChange={(value, dateString) => setDate(dateString)}
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
        <Select
          onChange={(value) => setBed(value)}
          className="w-100"
          size="large"
          placeholder="Number of beds"
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>

        <SearchOutlined
          onClick={handleSubmit}
          className="btn btn-primary p-3 btn-square"
        />
      </div>
    </>
  );
};

export default Search;
