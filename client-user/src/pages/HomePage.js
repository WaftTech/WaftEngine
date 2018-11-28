import React, { Component } from "react";
import { Link } from "react-router-dom";
import fb from "../img/fb.svg";
import tw from "../img/tw.svg";
import profilepic from "../img/profilepic.png";
import user1 from "../img/user1.png";
import user2 from "../img/user2.png";
import postImg1 from "../img/postImg1.png";
import postImg2 from "../img/postImg2.png";
import offer1 from "../img/offer1.jpg";
import offer2 from "../img/offer2.jpg";
import offer3 from "../img/offer3.jpg";

export default class HomePage extends Component {
  render() {
    return (
      <div className="col-md-9">
        <div className="row">
          <div className="col-md-8">
            <div className="post">
              <textarea placeholder="Hey, Thinking About Trips? Offer Now" />
              <button className="btn btn-light btn-sm mr-2">
                Start Date - End Date
              </button>
              <button className="btn btn-light btn-sm mr-2">From</button>
              <button className="btn btn-light btn-sm mr-2">To</button>
              <button className="btn btn-primary btn-sm float-right">
                Continue
              </button>
            </div>

            <div className="card mb-4">
              <div className="media p-2">
                <img alt="pics" className="maxWidth40" src={user1} />
                <div className="media-body pl-2">
                  <Link to="/" className="bold">
                    Hiking to Punhill
                  </Link>
                  <div className="text-sm">
                    <span>Est. Cost: USD 460</span> | <span>Days:5</span>
                  </div>
                </div>
              </div>
              <div className="card-img">
                <img alt="pics" className="responsive-img" src={postImg1} />
              </div>

              <div className="p-2">
                <div className="row">
                  <div className="col-md-6">
                    <span className="text-sm pr-2">Share</span>
                    <Link to="/" className="p-2">
                      <img alt="pics" src={fb} />
                    </Link>
                    <Link to="/" className="p-2">
                      <img alt="pics" src={tw} />
                    </Link>
                  </div>
                  <div className="col-md-6 text-right">
                    <Link to="/trip-detail" className="btn btn-link btn-sm">
                      View Trip Details
                    </Link>
                    <Link to="/guest-detail" className="btn btn-primary btn-sm">
                      Ask4Trip
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="media p-2">
                <img alt="pics" className="maxWidth40" src={user2} />
                <div className="media-body pl-2">
                  <Link to="/" className="bold">
                    Jumla RaRa Trek
                  </Link>
                  <div className="text-sm">
                    <span>Est. Cost: USD 460</span> | <span>Days:5</span>
                  </div>
                </div>
              </div>
              <div className="card-img">
                <img alt="pics" className="responsive-img" src={postImg2} />
              </div>

              <div className="p-2">
                <div className="row">
                  <div className="col-md-6">
                    <span className="text-sm pr-2">Share</span>
                    <Link to="/" className="p-2">
                      <img alt="pics" src={fb} />
                    </Link>
                    <Link to="/" className="p-2">
                      <img alt="pics" src={tw} />
                    </Link>
                  </div>
                  <div className="col-md-6 text-right">
                    <Link to="/trip-detail" className="btn btn-link btn-sm">
                      View Trip Details
                    </Link>
                    <Link to="/guest-detail" className="btn btn-primary btn-sm">
                      Ask4Trip
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 pt-3">
            <h2>Latest Offers</h2>

            <div className="card-box">
              <div className="image-container">
                <img alt="pics" className="responsive-img" src={offer1} />
                <div className="overShadow">
                  <h4>
                    Everest Base Camp Trek via Gokyo Lakes and Cho La Pass
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="text-sm pl-2">
                    Est. Cost
                    <br />
                    USD2990
                  </div>
                </div>
                <div className="text-sm col-6 text-right">
                  <div className="pr-2">
                    {" "}
                    Days
                    <br /> 18
                  </div>
                </div>
              </div>
            </div>

            <div className="card-box">
              <div className="image-container">
                <img alt="pics" className="responsive-img" src={offer2} />
                <div className="overShadow">
                  <h4>Mardi Trek</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="text-sm pl-2">
                    Est. Cost
                    <br />
                    USD2990
                  </div>
                </div>
                <div className="text-sm col-6 text-right">
                  <div className="pr-2">
                    {" "}
                    Days
                    <br /> 18
                  </div>
                </div>
              </div>
            </div>

            <div className="card-box">
              <div className="image-container">
                <img alt="pics" className="responsive-img" src={offer3} />
                <div className="overShadow">
                  <h4>Upper Mustang Trek</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="text-sm pl-2">
                    Est. Cost
                    <br />
                    USD2990
                  </div>
                </div>
                <div className="text-sm col-6 text-right">
                  <div className="pr-2">
                    {" "}
                    Days
                    <br /> 18
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
