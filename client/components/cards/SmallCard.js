import Image from "next/image";
import { diffDays } from "../../actions/hotel";
import Router from "next/router";

const SmallCard = ({ h }) => (
  <>
    <div className="card mb-3 mt-4">
      <div className="row no-gutters">
        <div className="col-md-4">
          <Image
            src="https://via.placeholder.com/100x100.png?text=PREVIEW"
            alt="preview_image"
            className="card img img-fluid m-2"
            width="100"
            height="100"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">
              {h.title}
              <span className="float-right text-primary"> Taka:{h.price}</span>
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
            <button
              className="btn btn-primary"
              onClick={() => Router.push(`/hotel/${h._id}`)}
            >
              Show more
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default SmallCard;
