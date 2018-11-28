import React, { Component } from "react";
import { Link } from "react-router-dom";
import fb from "../img/fb.svg";
import tw from "../img/tw.svg";
import logo from "../img/logo.svg";
import company from "../img/company_logo.png";
import profilepic from "../img/profilepic.png";
import postImg2 from "../img/postImg2.png";

export default class TripDetailPage extends Component {
  render() {
    return (
      <div className="col-md-9">
        <div className="row">
          <div className="col-md-8">
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
          <div className="col-md-4 pt-3">
            <h2>Offer By:</h2>

            <div className="media">
              <img src={company} />
              <div className="media-body">
                <h5> Mela Tours & Travels Pvt. Ltd.</h5>
                <p className="text-muted"> Thamel, Bhagwan Bahal, Kathmandu</p>
              </div>
            </div>

            <div className="card">
              <div className="media">
                <ion-icon name="mail" />
                <div className="media-body">
                  <span>Call Us</span>
                  <br />
                  <span>540-498-8629</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="media">
                <ion-icon name="call" />
                <div className="media-body">
                  <span>Email Us</span>
                  <br />
                  <span>tour@happytravelandtours.com</span>
                </div>
              </div>
            </div>

            <a href="/guest-info">
              <img src={logo} />
            </a>

            <p className="text-center text-sm">
              {" "}
              6 peoples asked for this trip
            </p>
          </div>
        </div>
      </div>
    );
  }
}
