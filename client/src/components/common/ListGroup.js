import _ from "lodash";
import ListGroupBootstrap from "react-bootstrap/ListGroup";

const ListGroup = ({
  items,
  selectedItem,
  idPath = "_id",
  propertyValue,
  onItemSelect,
}) => {
  return (
    <ListGroupBootstrap>
      {items.map((item) => (
        <ListGroupBootstrap.Item
          key={item[idPath]}
          onClick={() => onItemSelect(item)}
          active={item === selectedItem}
          className="d-flex justify-content-between align-items-start"
        >
          {item[propertyValue]}
        </ListGroupBootstrap.Item>
      ))}
    </ListGroupBootstrap>
  );
};

export default ListGroup;
