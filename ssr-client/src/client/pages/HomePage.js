import React from 'react';
import { withRouter } from 'react-router-dom';

export class Home extends React.Component {
  // handleSearchSubmit = () => {
  //   this.props.history.push('/map');
  // };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="media pt-4 mb-4">
              <img className="maxWidth40" src="/profilepic.png" alt="profile" />
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
              <button className="btn btn-light btn-sm mr-2">Start Date - End Date</button>
              <button className="btn btn-light btn-sm mr-2">From</button>
              <button className="btn btn-light btn-sm mr-2">To</button>
              <button className="btn btn-primary btn-sm float-right">Continue</button>
            </div>

            <div className="card mb-4">
              <div className="media p-2">
                <img className="maxWidth40" src="user1.png" alt="user1" />
                <div className="media-body pl-2">
                  <a className="bold" href="/">
                    Hiking to Punhill
                  </a>
                  <div className="text-sm">
                    <span>Est. Cost: USD 460</span> | <span>Days:5</span>
                  </div>
                </div>
              </div>
              <div className="card-img">
                <img className="responsive-img" src="postImg1.png" alt="post1" />
              </div>

              <div className="p-2">
                <div className="row">
                  <div className="col-md-6">
                    <span className="text-sm pr-2">Share</span>
                    <a href="/" className="p-2">
                      <img src="/fb.svg" alt="fb" />
                    </a>
                    <a href="/" className="p-2">
                      <img src="/tw.svg" alt="tw" />
                    </a>
                  </div>
                  <div className="col-md-6 text-right">
                    <a className="btn btn-link btn-sm" href="/">
                      View Trip Details
                    </a>
                    <a href="/" className="btn btn-primary btn-sm">
                      Ask4Trip
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="media p-2">
                <img className="maxWidth40" src="/user2.png" alt="user2" />
                <div className="media-body pl-2">
                  <a className="bold" href="/">
                    Jumla RaRa Trek
                  </a>
                  <div className="text-sm">
                    <span>Est. Cost: USD 460</span> | <span>Days:5</span>
                  </div>
                </div>
              </div>
              <div className="card-img">
                <img className="responsive-img" src="/postImg2.png" alt="postImg2" />
              </div>

              <div className="p-2">
                <div className="row">
                  <div className="col-md-6">
                    <span className="text-sm pr-2">Share</span>
                    <a href="/" className="p-2">
                      <img src="/fb.svg" alt="fb" />
                    </a>
                    <a href="/" className="p-2">
                      <img src="/tw.svg" alt="tw" />
                    </a>
                  </div>
                  <div className="col-md-6 text-right">
                    <a className="btn btn-link btn-sm" href="/">
                      View Trip Details
                    </a>
                    <a href="/" className="btn btn-primary btn-sm">
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
                <img className="responsive-img" src="/offer1.jpg" alt="offer1" />
                <div className="overShadow">
                  <h4>Everest Base Camp Trek via Gokyo Lakes and Cho La Pass</h4>
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
                    {' '}
                    Days
                    <br /> 18
                  </div>
                </div>
              </div>
            </div>

            <div className="card-box">
              <div className="image-container">
                <img className="responsive-img" src="/offer2.jpg" alt="offer2" />
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
                    {' '}
                    Days
                    <br /> 18
                  </div>
                </div>
              </div>
            </div>

            <div className="card-box">
              <div className="image-container">
                <img className="responsive-img" src="/offer3.jpg" alt="offer3" />
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
                    {' '}
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

export default {
  component: withRouter(Home),
};
