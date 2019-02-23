/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
// FormCode.js

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

const validate = values => {
  const errors = {};
  if (!values.searchText) {
    errors.searchText = 'Required';
  } else if (values.searchText.length < 2) {
    errors.searchText = 'Minimum be 2 characters or more';
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

// eslint-disable-next-line import/no-mutable-exports
let GitForm = props => {
  const { handleSubmit, pristine, submitting } = props;

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
          <label>Licence</label>:
          <Field name="licence" component="select" className="custom-select custom-select-lg mb-3">
            <option value="mit">MIT</option>
            <option value="isc">ISC</option>
            <option value="apache">Apache</option>
            <option value="gpl">GPL</option>
          </Field>
        </div>
        <div className="col custom-control custom-checkbox">
          <Field name="hasForked" component="input" type="checkbox" /> <label>Include Forked</label>
        </div>
      </div>
      <div className="col text-center form-group">
        <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
          SEARCH
        </button>
      </div>
    </form>
  );
};

GitForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

GitForm.defaultProps = {
  handleSubmit: () => {},
  pristine: false,
  submitting: false,
};

GitForm = reduxForm({
  form: 'gitform',
  validate
})(GitForm);

export default GitForm;
