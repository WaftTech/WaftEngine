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

export default class TripDetailPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="media pt-4 mb-4">
              <img alt="pics" className="maxWidth40" src={profilepic} />
              <div className="media-body pt-2 pl-2">Celina Jose</div>
            </div>

            <ul className="navList">
              <li>
                <Link to="/">Trip Feed</Link>
              </li>
              <li>
                <Link to="/">Upcoming Trips</Link>
              </li>
              <li>
                <Link to="/">Recent Trips</Link>
              </li>
            </ul>
            <ul className="nav nav-horz">
              <li>About us </li>
              <li> | </li>
              <li>Terms of Use</li>
            </ul>
          </div>

          <div className="col-md-6">
            <div className="slider-container">
              <img alt="pics" className="" src={postImg2} />
            </div>
            <ion-icon name="logo-facebook" />
            <ion-icon name="logo-twitter" />

            <h1>Jumla Rara Trek</h1>
            <div className="text-sm">
              <span>Est. Cost: USD 460</span> | <span>Days:5</span>
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
                  <Link to="/" className="btn btn-link btn-sm">
                    View Trip Details
                  </Link>
                  <Link to="/" className="btn btn-primary btn-sm">
                    Ask4Trip
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 pt-3">
            <h2>Offer By:</h2>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
