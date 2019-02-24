/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
// import * as actions from "../../actions/index";
// import history from "../../utitilies/history";
import "./style.scss";

const validate = values => {
  const errors = {};
  if (!values.searchText) {
    errors.searchText = "Required";
  } else if (values.searchText.length < 2) {
    errors.searchText = "Minimum be 2 characters or more";
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <input {...input} placeholder={label} type={type} className="form-control" />
    {touched &&
      ((error && <span className="text-danger">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
);

class GitForm extends Component {
  /* handleFormSubmit(formProps) {
    console.log("Form Props:: ", formProps);
    console.log(this.props);
    this.props.performSearch(formProps);
    const url = `?searchText=${formProps.searchText}${
      formProps.stars ? `&stars=${formProps.stars}` : ""
    }${formProps.hasForked ? "&fork=true" : ""}&license=${
      formProps.license ? formProps.license : "mit"
    }`;
    history.push(url);
    // TODO: Clear Form Values
    // Clear the search results and fetch again
  } */

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit} className="container">
        <div className="row">
          <div className="form-group col">
            <Field name="searchText" component={renderField} label="Search Text" />
          </div>
          <div className="form-group col">
            <Field name="stars" component={renderField} label="stars" />
          </div>
        </div>
        <div className="row">
          <div className="form-group col">
            <label>License</label>:
            <Field
              name="license"
              component="select"
              className="custom-select custom-select-lg mb-3"
            >
              <option value="mit">MIT</option>
              <option value="isc">ISC</option>
              <option value="apache-2.0">Apache License 2.0</option>
              <option value="gpl">GPL</option>
            </Field>
          </div>
          <div className="col custom-control custom-checkbox">
            <Field name="hasForked" component="input" type="checkbox" />{" "}
            <label>Include Forked</label>
          </div>
        </div>
        <div className="col text-center form-group">
          <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
            SEARCH
          </button>
        </div>
      </form>
    );
  }
}

GitForm.propTypes = {
  handleSubmit: PropTypes.func,
  performSearch: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
};

GitForm.defaultProps = {
  handleSubmit: () => {},
  performSearch: () => {},
  pristine: false,
  submitting: false
};

export { GitForm, validate };

export default reduxForm({
  form: "gitform",
  fields: ["searchText", "stars", "license", "hasForked"],
  validate
})(GitForm);
