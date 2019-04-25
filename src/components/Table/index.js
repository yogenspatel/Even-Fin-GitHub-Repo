import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SortBy } from "../../actions";
import "./style.scss";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "id",
      order: "asc"
    };
  }

  sortBy = e => {
    this.props.SortBy(e.target.name, this.props.userData, e.target.value);
    this.setState({
      sortBy: e.target.name,
      order: e.target.value
    });
  };

  toggleOrangeColor = () => {
    this.state.class ? this.setState({ class: "" }) : this.setState({ class: "orange" });
  };

  renderTable() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>
              id
              <select
                className="custom-select"
                name="id"
                onChange={this.sortBy}
                value={this.state.sortBy === "id" ? this.state.order : ""}
              >
                <option value="">Order</option>
                <option value="asc">Asc</option>
                <option value="dec">Dec</option>
              </select>
            </th>
            <th>
              userId
              <select
                className="custom-select"
                name="userId"
                onChange={this.sortBy}
                value={this.state.sortBy === "userId" ? this.state.order : ""}
              >
                <option value="">Order</option>
                <option value="asc">Asc</option>
                <option value="dec">Dec</option>
              </select>
            </th>
            <th>
              Title
              <select
                className="custom-select"
                name="title"
                onChange={this.sortBy}
                value={this.state.sortBy === "title" ? this.state.order : ""}
              >
                <option value="">Order</option>
                <option value="asc">Asc</option>
                <option value="dec">Dec</option>
              </select>
            </th>
            <th>
              Completed ?
              <select
                className="custom-select"
                name="completed"
                onChange={this.sortBy}
                value={this.state.sortBy === "completed" ? this.state.order : ""}
              >
                <option value="">Order</option>
                <option value="asc">Asc</option>
                <option value="dec">Dec</option>
              </select>
            </th>
            <th>Orange {"<-->"} Black</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    const { userData } = this.props;
    return !(userData && userData.length) ? (
      <tr>
        <td>No Results found</td>
      </tr>
    ) : (
      userData.map(todo => this.renderRow(todo))
    );
  }

  getClassName(id) {
    if (id % 2 !== 0) return this.state.class;
    else if (id % 2 === 0 && this.props.searchData && this.props.searchData.className) {
      return this.props.searchData.className;
    }
  }

  renderRow(item) {
    return (
      <tr key={item.id} className={this.getClassName(item.id)}>
        <td>{item.id}</td>
        <td>{item.userId}</td>
        <td>{item.title}</td>
        <td>{item.completed ? "Completed" : "Not Completed"}</td>
        <td>
          <button className="btn btn-info" onClick={this.toggleOrangeColor}>
            Orange {"<-->"} Black{" "}
          </button>
        </td>
      </tr>
    );
  }
  render() {
    return <div>{this.renderTable()}</div>;
  }
}

Table.propTypes = {
  SortBy: () => {},
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  searchData: PropTypes.object
};

Table.defaultProps = {
  userData: [],
  SortBy: null,
  searchData: {}
};

function mapStateToProps(state) {
  let { userData, searchData, paginatedData } = state;
  userData =
    paginatedData && paginatedData.paginated_data ? paginatedData.paginated_data : userData;

  // userData = searchData && searchData.search_data ? searchData.search_data : userData;
  return { userData, searchData };
}

export { Table };
export default connect(
  mapStateToProps,
  { SortBy }
)(Table);
