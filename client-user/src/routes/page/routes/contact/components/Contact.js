import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import QueueAnim from 'rc-queue-anim';

const Hero = () => (
  <article className="article">
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">How can we help you?</h1>
      </div>
      <p className="hero-tagline">Feel free to contact us if you have any questions</p>
    </section>
  </article>
    );

const Contact = () => (
  <article className="article">
    <h2 className="article-title text-center mt-0">Contact Us</h2>
    <div className="container-fluid container-mw-xl">
      <div className="row">
        <div className="col-xl-6">
          <div className="box box-transparent mb-4">
            <div className="box-body">
              <h6>Get In Touch</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consectetur necessitatibus ea possimus est quis cumque vel saepe. Eum, quas, ducimus.</p>
              <div className="divider my-4 divider-solid" />
              <p>123 Mountain View <br /> Santa Clara, C.A. <br /> USA</p>
              <div className="divider my-4 divider-solid" />
              <p>
                <strong>E:</strong> mail@site.com
                <br />
                <strong>P:</strong> +1 234 56789
                <br />
                <strong>S:</strong> www.site.com
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="box box-transparent mb-4">
            <div className="box-body">
              <h6>Contact</h6>
              <form name="contactForm">
                <div className="form-group">
                  <TextField
                    label="Name"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    label="Message"
                    multiline
                    rows="3"
                    fullWidth
                  />
                </div>
                <div className="divider" />
                <Button variant="contained" color="primary" className="btn-w-md"> Submit </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
);

const Page = () => (
  <section className="chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div className="article__section" key="1"><Hero /></div>
      <div className="article__section" key="2"><Contact /></div>
    </QueueAnim>
  </section>
);

export default Page;
