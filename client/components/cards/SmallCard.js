import Image from "next/image";
import { diffDays } from "../../actions/hotel";
import Router from "next/router";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

const SmallCard = ({
  h,
  handleHotelDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => (
  <>
    <div className="card mb-3 mt-4">
      <div className="row no-gutters">
        <div className="col-md-4">
          {h.image && h.image.contentType ? (
            <Image
              src={`http://localhost:8000/api/hotel/image/${h._id}`}
              alt="preview_image"
              className="card img img-fluid m-2"
              width="400"
              height="400"
            />
          ) : (
            <Image
              src="https://via.placeholder.com/100x100.png?text=PREVIEW"
              alt="preview_image"
              className="card img img-fluid m-2"
              width="400"
              height="400"
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">
              {h.title}
              <span className="float-right text-primary"> {h.price} Taka</span>
            </h3>
            <p className="alert alert-info">{h.location}</p>
            <p className="card-text">{`${h.content.substring(0, 200)}...`}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(h.from, h.to)}{" "}
                {diffDays(h.from, h.to) <= 1 ? " day" : " days"}
              </span>
            </p>
            <p className="card-text">{h.bed} bed</p>
            <p className="card-text">
              Available from {new Date(h.from).toLocaleDateString()}
            </p>

            <div className="d-flex justify-content-between h4">
              {showViewMoreButton && (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    Router.push({
                      pathname: `/hotel/`,
                      query: { name: `${h._id}` },
                    })
                  }
                >
                  Show more
                </button>
              )}
              {owner && (
                <>
                  <Link
                    href={{
                      pathname: `/edit-hotel/`,
                      query: { name: `${h._id}` },
                    }}
                  >
                    <EditOutlined className="text-warning" />
                  </Link>
                  <DeleteOutlined
                    onClick={() => handleHotelDelete(h._id)}
                    className="text-danger"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default SmallCard;
