import React from "react";
import PropType from "prop-types";

class Table extends React.Component {
  renderTable(data) {
    return (
      <table>
        <thead>
          <tr>
            <th>
              userId
              <select>
                <option>Order</option>
                <option>Asc</option>
                <option>Dec</option>
              </select>
            </th>
            <th>
              Title
              <select>
                <option>Order</option>
                <option>Asc</option>
                <option>Dec</option>
              </select>
            </th>
            <th>
              Completed ?
              <select>
                <option>Order</option>
                <option>Asc</option>
                <option>Dec</option>
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
  data: PropType.array
};

Table.defaultProps = {
  data: []
};

export default Table;
