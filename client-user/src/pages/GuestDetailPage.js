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
              <div className="media-body">
                <h6> Mela Tours & Travels Pvt. Ltd.</h6>
                <p className="text-muted"> Thamel, Bhagwan Bahal, Kathmandu</p>
              </div>
            </div>

            <div className="card p-1">
              <div className="media">
                <ion-icon name="mail" className="mr-2" />
                <div className="media-body">
                  <span>Call Us</span>
                  <br />
                  <span>540-498-8629</span>
                </div>
              </div>
            </div>

            <div className="card p-1">
              <div className="media">
                <ion-icon name="call" className="mr-2" />
                <div className="media-body">
                  <span>Email Us</span>
                  <br />
                  <span>tour@happytravelandtours.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
