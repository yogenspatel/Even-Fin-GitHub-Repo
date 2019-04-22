import React from "react";
import { connect } from "react-redux";
import { SearchData } from "../../actions/index";
import PropTypes from "prop-types";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
  }
  updateSearchValue = e => {
    this.setState({
      searchInput: e.target.value
    });
    setTimeout(() => this.props.SearchData(this.state.searchInput, this.props.data), 200);
  };
  render() {
    return (
      <input
        name="search"
        id="search"
        placeholder="Search records"
        onChange={this.updateSearchValue}
        value={this.state.searchInput}
      />
    );
  }
}

Search.propTypes = {
  SearchData: PropTypes.func,
  data: PropTypes.array
};

Search.defaultProps = {
  SearchData: () => {},
  data: []
};

export default connect(
  null,
  { SearchData }
)(Search);
