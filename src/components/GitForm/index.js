/**
 * Renders Form Component
 * Contains following fields:
 * **Text** field - a text box for full-text search queries, maps to the `q` query parameter.
 * **Stars** - a text box that maps to the `stars` qualifier.
 * **License** - a dropdown that maps to the `license` qualifier, and includes the MIT, ISC, Apache and GPL license types.
 * **Include Forked** - a checkbox that sets the `fork` qualifier to "true"
 */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadFromQueryParams } from "../../actions";
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

// eslint-disable-next-line react/prop-types
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <input {...input} placeholder={label} type={type} className="form-control" />
    {touched &&
      ((error && <span className="text-danger">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
);

class GitForm extends Component {
  componentDidMount() {
    this.props.loadFromQueryParams(); // Get Query Params on component mount
  }
  render() {
    const { handleSubmit } = this.props;
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
            <Field name="fork" component="input" type="checkbox" /> <label>Include Forked</label>
          </div>
        </div>
        <div className="col text-center form-group">
          <button type="submit" className="btn btn-primary">
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
  loadFromQueryParams: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
};

GitForm.defaultProps = {
  handleSubmit: () => {},
  performSearch: () => {},
  loadFromQueryParams: () => {},
  pristine: true,
  submitting: true
};

export { GitForm, validate };

function mapStatetoProps(state) {
  return {
    initialValues: state.searchResults ? state.searchResults.queryParams : null
  };
}
const GitFormWithValidator = reduxForm({
  form: "gitform",
  fields: ["searchText", "stars", "license", "fork"],
  validate
})(GitForm);

export default connect(
  mapStatetoProps,
  { loadFromQueryParams }
)(GitFormWithValidator);
