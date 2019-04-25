import React from "react";
import { connect } from "react-redux";
import { SearchData, toggleGreenColor, SearchPaginatedData } from "../../actions/index";
import PropTypes from "prop-types";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      class: "green"
    };
  }
  updateSearchValue = e => {
    this.setState(
      {
        searchInput: e.target.value
      },
      () => {
        this.props.SearchData(this.state.searchInput, this.props.data);
        this.props.SearchPaginatedData(this.state.searchInput, this.props.data);
      }
    );
  };

  toggleGreenColor = () => {
    this.state.class ? this.setState({ class: "" }) : this.setState({ class: "green" });
    this.props.toggleGreenColor(this.state.class);
  };

  render() {
    return (
      <React.Fragment>
        <input
          name="search"
          id="search"
          placeholder="Search records"
          onChange={this.updateSearchValue}
          value={this.state.searchInput}
        />
        <button className="btn btn-info" onClick={this.toggleGreenColor}>
          Green {"<-->"} Black
        </button>
      </React.Fragment>
    );
  }
}

Search.propTypes = {
  SearchData: PropTypes.func,
  SearchPaginatedData: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  toggleGreenColor: PropTypes.func
};

Search.defaultProps = {
  SearchData: () => {},
  SearchPaginatedData: () => {},
  data: {},
  toggleGreenColor: () => {}
};

export { Search };

export default connect(
  null,
  { SearchData, toggleGreenColor, SearchPaginatedData }
)(Search);
