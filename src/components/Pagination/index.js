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
      currentPage: 1
    };
  }
  updateCurrentPage = currentPage => {
    this.setState(
      {
        currentPage: currentPage
      },
      () => {
        this.props.getPaginatedData(
          this.state.currentPage,
          this.pageSize,
          this.noOfItems,
          this.props.data
        );
      }
    );
  };

  renderTotalPages = () => {
    let items = [];
    for (let i = 0; i < this.totalPages; i++) {
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
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Pagination.defaultProps = {
  getPaginatedData: () => {},
  data: {}
};

export { Pagination };
export default connect(
  null,
  { getPaginatedData }
)(Pagination);
