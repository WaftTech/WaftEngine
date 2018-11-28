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
              <img alt="pics" className="img-fluid mt-4 mb-4" src={postImg2} />
            </div>
            <div className="flex alignItemCenter mb-3">
              <span>Share</span>
              <a href="#" className="p-1">
                <ion-icon name="logo-facebook" />{" "}
              </a>
              <a href="#" className="p-1">
                {" "}
                <ion-icon name="logo-twitter" />
              </a>
            </div>
            <h1>Jumla Rara Trek</h1>
            <div className="card p-2 mb-2">
              <div className="row">
                <div className="col-6 text-center">
                  {" "}
                  <span className="text-lg">$2090</span>
                  <br />
                  <span className="text-muted">Total Estimated Cost</span>{" "}
                </div>
                <div className="col-6 text-center">
                  {" "}
                  <span className="text-lg">12</span>
                  <br />
                  <span className="text-muted">Total Persons</span>{" "}
                </div>
              </div>
            </div>
            <div className="card p-2 mb-4">
              <div className="row">
                <div className="col-4">
                  {" "}
                  Start From <br />
                  <span className="color-blue text-lg"> Oct 23</span>{" "}
                </div>
                <div className="col-4">
                  {" "}
                  Duration <br />
                  <span className="color-blue text-lg">9 Days</span>{" "}
                </div>
                <div className="col-4">
                  {" "}
                  End Date <br />
                  <span className="color-blue text-lg">Nov 10</span>{" "}
                </div>
              </div>
            </div>
            <h2>About Trip</h2>
            <p>
              Rara Lake Trek is a unique opportunity to be among those who have
              treaded on the remote trails of western Nepal. The 15-day trek
              begins with visits to UNESCO World Heritage Sites in Kathmandu
              followed by a flight to Nepalgunj and then to Jumla. From Jumla,
              you will set forth on a journey that promises greater solitude and
              a chance to be in the presence of the fantastic Rara Lake. It is
              the highest lake in Nepal and proudly addressed by the Nepalese as
              the Queen of Lakes . During your trek, you will also be entering
              the Rara National Park which is considered to be one of the finest
              parks in the world and is an ideal habitat for musk deer,
              Himalayan black bear, leopard, Himalayan goral, and other exotic
              animals. On your journey you will not only be in the presence of
              snowcapped mountains, forests and enchanting lakes but will also
              get to witness the rustic life of the locals who call this remote
              land their home.
            </p>
            <br />
            <h2>Outline Itinerary</h2>
            <p>
              Day 01 Arrival in Kathmandu (1,300m/4,264ft) <br />
              Day 02 Kathmandu sightseeing: World Heritage Sites <br />
              Day 03 Fly from Kathmandu to Nepalgunj (150m/490 ft): 1 hour{" "}
              <br />
              Day 04 Fly from Nepalgunj to Jumla (2,540m/8,334ft): 20 minutes{" "}
              <br />
              Day 05 Trek from Jumla to Chere Chaur (3055m/10,023ft) <br />
              Day 06 Chere Chaur to Chalachaur (2980m/9,777ft) <br />
              Day 07 Chalachaur to Sinja Valley (2490m/ft) <br />
              Day 08 Sinja to Ghorosingha (3050m/10007ft) <br />
              Day 09 Ghorosingha to Rara Lake (3010m/9876ft) <br />
              Day 10 Explore Rara Lake <br />
              Day 11 Fly to Nepalgunj, fly to Kathmandu <br />
              Day 12 Final departure
            </p>

            <Link to="/" className="btn btn-primary btn-lg btn-block">
              <img src={logo} />
            </Link>

            <br />
            <br />
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

            <div className="card p-2 mb-2">
              <div className="media alignItemCenter">
                <ion-icon name="call" />
                <div className="media-body pl-2">
                  <span>Call Us</span>
                  <br />
                  <span className="bold">540-498-8629</span>
                </div>
              </div>
            </div>

            <div className="card p-2  mb-2">
              <div className="media alignItemCenter">
                <ion-icon name="mail" />
                <div className="media-body pl-2">
                  <span>Email Us</span>
                  <br />
                  <span className="bold">tour@happytravelandtours.com</span>
                </div>
              </div>
            </div>

            <Link to="/" className="btn btn-primary btn-sm btn-block">
              <img className="height20" src={logo} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
