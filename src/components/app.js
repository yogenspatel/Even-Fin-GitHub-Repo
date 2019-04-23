import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserData, LOADING_STATUS } from "../actions/index";
import Table from "./Table";
import Search from "./Search";
class App extends Component {
  componentDidMount() {
    this.props.getUserData();
  }
  render() {
    if (this.props.userData && this.props.userData.status === LOADING_STATUS.IN_PROGRESS) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
    if (this.props.userData && this.props.userData.status === LOADING_STATUS.ERROR) {
      return (
        <div>
          <h1>Error...</h1>
        </div>
      );
    }

    return (
      <div>
        <Search data={this.props.userData} />
        <Table />
      </div>
    );
  }
}

App.propTypes = {
  getUserData: PropTypes.func,
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

App.defaultProps = {
  getUserData: () => {},
  userData: []
};

function mapStateToProps(state) {
  return {
    userData: state.userData
  };
}

export { App };

export default connect(
  mapStateToProps,
  { getUserData }
)(App);
