import React, { Component } from "react";
import "./App.css";

import Logo from "./img/logo.svg";
import fb from "./img/fb.svg";
import tw from "./img/tw.svg";
import profilepic from "./img/profilepic.png";
import user1 from "./img/user1.png";
import user2 from "./img/user2.png";
import postImg1 from "./img/postImg1.png";
import postImg2 from "./img/postImg2.png";
import offer1 from "./img/offer1.jpg";
import offer2 from "./img/offer2.jpg";
import offer3 from "./img/offer3.jpg";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <a className="" href="/">
                  <img src={Logo} />
                </a>
              </div>
              <div className="col-md-6">
                <div className="input-group input-group-sm input-search">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <ion-icon className="color-white" name="search" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Trips"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="float-right">
                  <a className="nav-link " href="/">
                    <img className="maxWidth20" src={profilepic} />
                    <ion-icon name="arrow-dropdown" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="media pt-4 mb-4">
                <img className="maxWidth40" src={profilepic} />
                <div className="media-body pt-2 pl-2">Celina Jose</div>
              </div>

              <ul className="navList">
                <li>
                  <a className="active" href="/">
                    Trip Feed
                  </a>
                </li>
                <li>
                  <a href="/">Upcoming Trips</a>
                </li>
                <li>
                  <a href="/">Recent Trips</a>
                </li>
              </ul>
              <ul className="nav nav-horz">
                <li>About us </li>
                <li> | </li>
                <li>Terms of Use</li>
              </ul>
            </div>

            <div className="col-md-6">
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
                  <img className="maxWidth40" src={user1} />
                  <div className="media-body pl-2">
                    <a className="bold" href="#">
                      Hiking to Punhill
                    </a>
                    <div className="text-sm">
                      <span>Est. Cost: USD 460</span> | <span>Days:5</span>
                    </div>
                  </div>
                </div>
                <div className="card-img">
                  <img className="responsive-img" src={postImg1} />
                </div>

                <div className="p-2">
                  <div className="row">
                    <div className="col-md-6">
                      <span className="text-sm pr-2">Share</span>
                      <a href="#" className="p-2">
                        <img src={fb} />
                      </a>
                      <a href="#" className="p-2">
                        <img src={tw} />
                      </a>
                    </div>
                    <div className="col-md-6 text-right">
                      <a className="btn btn-link btn-sm" href="#">
                        View Trip Details
                      </a>
                      <a href="#" className="btn btn-primary btn-sm">
                        Ask4Trip
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="media p-2">
                  <img className="maxWidth40" src={user2} />
                  <div className="media-body pl-2">
                    <a className="bold" href="#">
                      Jumla RaRa Trek
                    </a>
                    <div className="text-sm">
                      <span>Est. Cost: USD 460</span> | <span>Days:5</span>
                    </div>
                  </div>
                </div>
                <div className="card-img">
                  <img className="responsive-img" src={postImg2} />
                </div>

                <div className="p-2">
                  <div className="row">
                    <div className="col-md-6">
                      <span className="text-sm pr-2">Share</span>
                      <a href="#" className="p-2">
                        <img src={fb} />
                      </a>
                      <a href="#" className="p-2">
                        <img src={tw} />
                      </a>
                    </div>
                    <div className="col-md-6 text-right">
                      <a className="btn btn-link btn-sm" href="#">
                        View Trip Details
                      </a>
                      <a href="#" className="btn btn-primary btn-sm">
                        Ask4Trip
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 pt-3">
              <h2>Latest Offers</h2>

              <div className="card-box">
                <div className="image-container">
                  <img className="responsive-img" src={offer1} />
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
                  <img className="responsive-img" src={offer2} />
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
                  <img className="responsive-img" src={offer3} />
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
      </div>
    );
  }
}

export default App;
