import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import { SortBy } from "../../actions";

class Table extends React.Component {
  sortByUserID = e => {
    this.props.SortBy("userId", this.props.data, e.target.value);
    this.forceUpdate();
  };
  sortByTitle = e => {
    this.props.SortBy("title", this.props.data, e.target.value);
    this.forceUpdate();
  };
  sortByCompleted = e => {
    this.props.SortBy("completed", this.props.data, e.target.value);
    this.forceUpdate();
  };
  renderTable(data) {
    return (
      <table>
        <thead>
          <tr>
            <th>
              userId
              <select onChange={this.sortByUserID}>
                <option value="">Order</option>
                <option value="asc">Asc</option>
                <option value="dec">Dec</option>
              </select>
            </th>
            <th>
              Title
              <select onChange={this.sortByTitle}>
                <option value="">Order</option>
                <option value="asc">Asc</option>
                <option value="dec">Dec</option>
              </select>
            </th>
            <th>
              Completed ?
              <select onChange={this.sortByCompleted}>
                <option value="">Order</option>
                <option value="asc">Asc</option>
                <option value="dec">Dec</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>{this.renderRows(data)}</tbody>
      </table>
    );
  }

  renderRows(data) {
    return data.map(todo => this.renderRow(todo));
  }

  renderRow(item) {
    return (
      <tr key={item.id}>
        <td>{item.userId}</td>
        <td>{item.title}</td>
        <td>{item.completed ? "Completed" : "Not Completed"}</td>
      </tr>
    );
  }
  render() {
    const { data } = this.props;
    if (data && data.length) {
      return <div>{this.renderTable(data)}</div>;
    }
    return null;
  }
}

Table.propType = {
  data: PropType.array,
  SortBy: () => {}
};

Table.defaultProps = {
  data: [],
  SortBy: null
};

function mapStateToProps(state) {
  console.log("in component state: ", state);
  return state;
}

export default connect(
  mapStateToProps,
  { SortBy }
)(Table);
