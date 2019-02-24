import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import GitForm from "./GitForm";
import SearchResults from "./SearchResults";
import { performSearch } from "../actions";
import history from "../utitilies/history";

class App extends Component {
  submit = values => {
    this.props.performSearch(values);
    const url = `?searchText=${values.searchText}${values.stars ? `&stars=${values.stars}` : ""}${
      values.fork ? "&fork=true" : ""
    }&license=${values.license ? values.license : "mit"}`;
    history.push(url);
    // TODO: Clear Form Values
    // Clear the search results and fetch again
  };

  render() {
    return (
      <div>
        <Header />
        <h1 className="heading container display-4">Even Financial GitHub Repository Search</h1>
        <GitForm onSubmit={this.submit} />
        <SearchResults results={this.props.searchResults} />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  performSearch: PropTypes.func,
  searchResults: PropTypes.array
};

App.defaultProps = {
  performSearch: () => {},
  searchResults: []
};

function mapStatetoProps(state) {
  return {
    searchResults: state.searchResults
  };
}

export default connect(
  mapStatetoProps,
  { performSearch }
)(App);
