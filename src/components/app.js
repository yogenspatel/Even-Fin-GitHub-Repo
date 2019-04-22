import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTodoData, LOADING_STATUS } from "../actions/index";
import Table from "./Table";

class App extends Component {
  componentDidMount() {
    this.props.getTodoData();
  }
  render() {
    if (this.props.toDoData && this.props.toDoData.status === LOADING_STATUS.IN_PROGRESS) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
    if (this.props.toDoData && this.props.toDoData.status === LOADING_STATUS.ERROR) {
      return (
        <div>
          <h1>Error...</h1>
        </div>
      );
    }

    return (
      <div>
        <Table data={this.props.toDoData} />
      </div>
    );
  }
}

App.propTypes = {
  getTodoData: PropTypes.func,
  toDoData: PropTypes.any
};

App.defaultProps = {
  getTodoData: () => {},
  toDoData: []
};

function mapStateToProps(state) {
  return {
    toDoData: state.toDoData
  };
}

export default connect(
  mapStateToProps,
  { getTodoData }
)(App);
