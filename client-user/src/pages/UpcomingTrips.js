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

export default class UpcomingTrips extends Component {
  render() {
    return (
      <div className="col-md-9">
        <div className="row">
          <div className="col-md-8 pt-4">
            <h1>My Upcoming Trips</h1>

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
                    <span className="pr-2">Starting from Nov 24</span>
                    <Link to="/" className="btn btn-primary btn-sm">
                      NOTIFY ME
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 pt-3" />
        </div>
      </div>
    );
  }
}
