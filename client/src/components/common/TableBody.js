import _ from "lodash";

const TableBody = ({ items, columns }) => {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item._id}>
          {columns.map(({ path, component }) => (
            <td key={path}>
              {component
                ? component(_.get(item, path), item)
                : _.get(item, path)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
