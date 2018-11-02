import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const VerticalForm = () => (
  <article className="article">
    <div className="box box-default">
      <div className="box-header">Vertical Form</div>
      <div className="box-body py-5">

        <form>
          <div className="form-group">
            <label htmlFor="exampleInputName1">Name</label>
            <Input
              placeholder="Name"
              id="exampleInputName1"
              fullWidth
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <Input
              placeholder="Password"
              id="exampleInputPassword1"
              fullWidth
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  value="checked"
                  color="primary"
                />
              }
              label="Remember Me"
            />
          </div>
          <Button variant="contained" color="primary" className="btn-w-md"> Login </Button>
          <div className="divider" />
        </form>

      </div>
    </div>
  </article>
);

const HorizontalForm = () => (
  <article className="article">
    <div className="box box-default">
      <div className="box-header">Horizontal Form</div>
      <div className="box-body py-5">

        <form>
          <div className="form-group row">
            <label htmlFor="inputName2" className="col-md-2 col-form-label">Name</label>
            <div className="col-md-10">
              <Input
                placeholder="Name"
                id="inputName2"
                fullWidth
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword2" className="col-md-2 col-form-label">Password</label>
            <div className="col-md-10">
              <Input
                placeholder="Password"
                id="inputPassword2"
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10">
              <FormControlLabel
                control={
                  <Checkbox
                    value="checked"
                    color="primary"
                  />
                }
                label="Remember Me"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-2"></div>
            <div className="col-md-10">
              <Button variant="contained" className="btn-w-md"> Login </Button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </article>
);

const InlineForm = () => (
  <article className="article">
    <div className="box box-default">
      <div className="box-header">Inline Form</div>
      <div className="box-body py-5">

        <form className="form-inline">
          <Input
            placeholder="Name"
            className="mr-2"
          />
          
          <Input
            placeholder="Password"
            type="password"
            className="mr-2"
            inputProps={{
              'autoComplete': "off"
            }}
          />

          <FormControlLabel
            className="mr-2"
            control={
              <Checkbox
                value="checked"
                color="primary"
              />
            }
            label="Remember Me"
          />

          <Button variant="contained" color="secondary" className="btn-w-md"> Login </Button>
        </form>

      </div>
    </div>
  </article>
);


const Article = () => {
  return(
    <article className="article">
      <h2 className="article-title">Form Layout</h2>
      <VerticalForm />
      <HorizontalForm />
      <InlineForm />
    </article>
  )
}

export default Article;