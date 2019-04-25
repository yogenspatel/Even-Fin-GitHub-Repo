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
    } else if (nextProps && nextProps.paginatedData) {
      let totalPages = Math.ceil(
        nextProps.paginatedData.noOfItems / nextProps.paginatedData.pageSize
      );
      return {
        totalPages
      };
    }
    return null;
  }
  updateCurrentPage = (e, currentPage) => {
    e.preventDefault();
    this.setState({ currentPage }, () => {
      const dataForPagination = this.props.searchData ? this.props.searchData : this.props.userData;
      this.props.getPaginatedData(currentPage, this.state.pageSize, dataForPagination);
    });
  };

  arrowClicked = (e, direction) => {
    e.preventDefault();
    let currentPage = this.state.currentPage;
    if (direction === "prev" && currentPage !== 1) {
      currentPage = currentPage - 1;
    } else if (direction === "next" && currentPage < this.state.totalPages) {
      currentPage = currentPage + 1;
    }
    this.updateCurrentPage(e, currentPage);
  };

  renderTotalPages = () => {
    let items = [];
    let prevClassName = "page-item";
    prevClassName = this.state.currentPage === 1 ? `${prevClassName} disabled` : "";
    let nextClassName = "page-item";
    nextClassName =
      this.state.currentPage === this.state.totalPages ? `${nextClassName} disabled` : "";
    items.push(
      <li className={prevClassName} onClick={e => this.arrowClicked(e, "prev")}>
        <a className="page-link" href="#">
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </a>
      </li>
    );
    for (let i = 0; i < this.state.totalPages; i++) {
      let currentPage = i + 1;
      items.push(
        <li
          key={currentPage}
          className="page-item"
          onClick={e => this.updateCurrentPage(e, currentPage)}
        >
          <a className="page-link" href="#">
            {currentPage}
          </a>
        </li>
      );
    }
    items.push(
      <li className={nextClassName} onClick={e => this.arrowClicked(e, "next")}>
        <a className="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </a>
      </li>
    );
    return <ul className="pagination">{items.map(item => item)}</ul>;
  };
  render() {
    return (
      <div className="container">
        <nav className="row">{this.renderTotalPages()}</nav>
      </div>
    );
  }
}

Pagination.propTypes = {
  getPaginatedData: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  searchData: PropTypes.object,
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Pagination.defaultProps = {
  getPaginatedData: () => {},
  data: {},
  searchData: {},
  userData: {}
};

function mapStateToProps(state) {
  return {
    paginatedData: state.paginatedData,
    userData: state.userData,
    searchData:
      state.paginatedData && state.paginatedData.searchData ? state.paginatedData.searchData : null
  };
}

export { Pagination };
export default connect(
  mapStateToProps,
  { getPaginatedData }
)(Pagination);
