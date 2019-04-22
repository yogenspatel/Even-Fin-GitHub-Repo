import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import { SortBy } from "../../actions";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "userId",
      order: "asc"
    }
  }

  sortBy = e => {
    this.props.SortBy(e.target.name, this.props.data, e.target.value);
    this.setState({sortBy: e.target.name, order: e.target.value});
    // if(e.target.name) {
    //   e.target.value = "";
    // }
    // this.forceUpdate();
  };
  renderTable(data) {
    return (
      <table>
        <thead>
          <tr>
            <th>
              userId
              <select name="userId" onChange={this.sortBy}>
                <option value="">Order</option>
                <option value="asc">Asc</option>
                <option value="dec">Dec</option>
              </select>
            </th>
            <th>
              Title
              <select name="title" onChange={this.sortBy}>
                <option value="">Order</option>
                <option value="asc">Asc</option>
                <option value="dec">Dec</option>
              </select>
            </th>
            <th>
              Completed ?
              <select name="completed" onChange={this.sortBy}>
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
  return state.toDoData ? state.toDoData : state;
}

export default connect(
  mapStateToProps,
  { SortBy }
)(Table);
