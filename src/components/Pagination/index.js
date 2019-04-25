import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPaginatedData } from "../../actions";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.pageSize = 10;
    this.noOfItems = 200;
    this.totalPages = this.noOfItems / this.pageSize;
    this.state = {
      currentPage: 1,
      data: [],
      pageSize: this.pageSize,
      noOfItems: this.noOfItems,
      totalPages: this.totalPages
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps &&
      nextProps.data &&
      nextProps.data.length &&
      nextProps.data.length !== prevState.data.length
    ) {
      nextProps.getPaginatedData(prevState.currentPage, prevState.pageSize, nextProps.data);
      return { data: nextProps.data };
    } else if (
      nextProps &&
      nextProps.paginatedData &&
      nextProps.paginatedData.paginated_data &&
      nextProps.paginatedData.paginated_data.length &&
      nextProps.paginatedData.paginated_data.length !== prevState.data.length
    ) {
      if (nextProps.paginatedData) {
        let totalPages = Math.ceil(
          nextProps.paginatedData.noOfItems / nextProps.paginatedData.pageSize
        );
        return {
          totalPages
        };
      }
      return null;
    }
    return null;
  }
  updateCurrentPage = currentPage => {
    this.setState({ currentPage }, () => {
      const dataForPagination = this.props.searchData ? this.props.searchData : this.props.userData;
      this.props.getPaginatedData(currentPage, this.state.pageSize, dataForPagination);
    });
  };

  renderTotalPages = () => {
    let items = [];
    for (let i = 0; i < this.state.totalPages; i++) {
      let currentPage = i + 1;
      items.push(
        <li key={currentPage} onClick={() => this.updateCurrentPage(currentPage)}>
          {currentPage}
        </li>
      );
    }
    return <ul>{items.map(item => item)}</ul>;
  };
  render() {
    return <div>This is pagination {this.renderTotalPages()}</div>;
  }
}

Pagination.propTypes = {
  getPaginatedData: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  searchData: PropTypes.object,
  userData: PropTypes.array
};

Pagination.defaultProps = {
  getPaginatedData: () => {},
  data: {},
  searchData: {},
  userData: []
};

function mapStateToProps(state) {
  return {
    paginatedData: state.paginatedData,
    userData: state.userData,
    searchData: state.searchData ? state.searchData.search_data : null
  };
}

export { Pagination };
export default connect(
  mapStateToProps,
  { getPaginatedData }
)(Pagination);
