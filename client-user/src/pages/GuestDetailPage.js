import React, { Component } from "react";
import { Link } from "react-router-dom";
import fb from "../img/fb.svg";
import tw from "../img/tw.svg";
import logo from "../img/logo.svg";
import company from "../img/company_logo.png";
import profilepic from "../img/profilepic.png";
import postImg2 from "../img/postImg2.png";

export default class GuestDetailPage extends Component {
  render() {
    return (
      <div className="col-md-9">
        <div className="row">
          <div className="col-md-8">Guest Detail</div>
          <div className="col-md-4 pt-3">
            <h2>Offer By:</h2>

            <div className="media">
              <img className="maxWidth40" src={company} />
              <div className="media-body pl-3">
                <p className="mb-0"> Mela Tours & Travels Pvt. Ltd.</p>
                <p className="text-muted text-sm">
                  {" "}
                  Thamel, Bhagwan Bahal, Kathmandu
                </p>
              </div>
            </div>

            <div className="card p-1 mb-2">
              <div className="media alignItemCenter">
                <ion-icon name="call" />
                <div className="media-body pl-2">
                  <span>Call Us</span>
                  <br />
                  <span className="bold">540-498-8629</span>
                </div>
              </div>
            </div>

            <div className="card p-1  mb-2">
              <div className="media alignItemCenter">
                <ion-icon name="mail" />
                <div className="media-body pl-2">
                  <span>Email Us</span>
                  <br />
                  <span className="bold">tour@happytravelandtours.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
