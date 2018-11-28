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
          <div className="col-md-8 pt-4">
            <h1 className="text-lg">Jumla Rara Trek</h1>

            <div className="card p-3 pb-0 mb-4">
              <div className="row">
                <div className="col-6">
                  <p className="text-sm">Total Estimated Cost: $2070</p>
                  <p className="text-sm">Offer From: Company </p>
                  <p className="text-sm">No. of Person: 2 mininum</p>
                </div>
                <div className="col-6 text-right">
                  <p className="text-sm">
                    Start From{" "}
                    <span className="text-lg lh-1 d-block">Oct 25</span>
                  </p>
                  <p className="text-sm">
                    Return Back{" "}
                    <span className="text-lg lh-1 d-block">Nov 6</span>
                  </p>
                </div>
              </div>
            </div>

            <form className="mb-5">
              <div className="form-group">
                <label for="location">Current Location</label>
                <input
                  type="email"
                  className="form-control"
                  id="location"
                  placeholder="Current Location"
                />
              </div>
              <div className="form-group">
                <label for="contact">Contact</label>
                <input
                  type="password"
                  className="form-control"
                  id="contact"
                  placeholder="Mobile/Email"
                />
              </div>

              <div className="form-group">
                <label for="numberTraveler">Number of Traveler</label>
                <select class="form-control" id="numberTraveler">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>

              <Link to="/" className="btn btn-primary btn-lg btn-block">
                <img src={logo} />
              </Link>
            </form>
          </div>
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
