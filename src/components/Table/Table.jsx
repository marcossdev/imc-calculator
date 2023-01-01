import './Table.css';
import PropTypes from 'prop-types';

function Table({ tableData, tableColumn }) {
  let key = 0;
  return (
    <table>
      <thead>
        <tr>
          {tableColumn.map((column) => (
            <th key={key++}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((data) => (
          <tr key={key++}>
            {tableColumn.map((column) => (
              <td key={key++}>{data[`${column.value}`]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  tableColumn: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

Table.defaultProps = {
  tableData: [{}],
  tableColumn: [{}],
};

export default Table;
