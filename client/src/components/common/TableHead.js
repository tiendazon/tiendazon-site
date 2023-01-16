const TableHead = ({ columns, onSort }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => {
          let onSortEvent = undefined;
          let sortStyle = {};

          if (column.sortable) {
            onSortEvent = () => onSort(column);
            sortStyle = { cursor: "pointer" };
          }
          return (
            <th style={sortStyle} onClick={onSortEvent} key={column.path}>
              {column.label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
