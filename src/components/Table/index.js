import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SortBy } from "../../actions";

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

  toggleBGColor = () => {
    this.setState({
      bgColor: "#FF4500"
    });
  };

  renderTable() {
    return (
      <table>
        <thead>
          <tr>
            <th>
              id
              <select
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
                name="completed"
                onChange={this.sortBy}
                value={this.state.sortBy === "completed" ? this.state.order : ""}
              >
                <option value="">Order</option>
                <option value="asc">Asc</option>
                <option value="dec">Dec</option>
              </select>
            </th>
            <th>Row Color</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    const { userData } = this.props;
    return userData && userData.length ? (
      userData.map(todo => this.renderRow(todo))
    ) : (
      <div>No Results found</div>
    );
  }

  renderRow(item) {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.userId}</td>
        <td>{item.title}</td>
        <td>{item.completed ? "Completed" : "Not Completed"}</td>
        <td>
          <button onClick={this.toggleBGColor}>Color Toggle</button>
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
  userData: PropTypes.array
};

Table.defaultProps = {
  userData: [],
  SortBy: null
};

function mapStateToProps(state) {
  let { userData, searchData } = state;
  userData = searchData ? searchData : userData;
  return { userData };
}

export default connect(
  mapStateToProps,
  { SortBy }
)(Table);
