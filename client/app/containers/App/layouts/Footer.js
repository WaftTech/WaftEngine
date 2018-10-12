import React from 'react';

const Footer = () => (
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-3">
          <h3 className="title">About us</h3>
          <p>
            The industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book.
          </p>
        </div>
        <div className="col-3">
          <div className="widget-ft style1 widget-services">
            <h3 className="title">Quicklink</h3>{' '}
            <ul className="one-half first">
              <li>
                <a href="#" title="">
                  Home
                </a>
              </li>{' '}
              <li>
                <a href="#" title="">
                  About us
                </a>
              </li>{' '}
              <li>
                <a href="#" title="">
                  Services
                </a>
              </li>{' '}
              <li>
                <a href="#" title="">
                  Cases
                </a>
              </li>
            </ul>{' '}
            <ul className="one-half">
              <li>
                <a href="#" title="">
                  Contact us
                </a>
              </li>{' '}
              <li>
                <a href="#" title="">
                  Clients
                </a>
              </li>{' '}
              <li>
                <a href="#" title="">
                  Testimonial
                </a>
              </li>{' '}
              <li>
                <a href="#" title="">
                  News
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-3">
          <div className="widget-ft style1 widget-lastest">
            <h3 className="title">Latest Twitter</h3>{' '}
            <ul>
              <li>
                <a href="#" title="">
                  <i className="fa fa-twitter" />@Stats
                </a>{' '}
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s.
              </li>{' '}
              <li>
                <a href="#" title="">
                  <i className="fa fa-twitter" />@Stats.D
                </a>{' '}
                Lorem Ipsum is simply dummy text of the printing and
                typesetting.Lorem Ipsum is simply dummy.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
