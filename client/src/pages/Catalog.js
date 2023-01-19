import { useState, useEffect } from "react";
import _ from "lodash";

import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Pagination from "../components/common/Pagination";
import ListGroup from "../components/common/ListGroup";
import Table from "../components/common/Table";
import SearchBox from "../components/common/SearchBox";

import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import paginate from "../utils/paginate";

import AuthConsumer from "../hooks/useAuth";
import { Link } from "react-router-dom";

const pageSize = 10;

const columns = [
  {
    path: "image",
    label: "Imagen",
    component: (image) => <img alt="producto" width="100" src={image} />,
  },
  { path: "name", label: "Nombre", sortable: true },
  { path: "price", label: "Precio", sortable: true },
  { path: "category.name", label: "Categoria", sortable: true },
];

function Catalog() {
  const { isLoadingProducts, products } = useProducts();
  const { isLoadingCategories, categories } = useCategories();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [sortedColumn, setSortedColumn] = useState({});
  const [searchedProductName, setSearchedProductName] = useState("");

  const [user, dispatch] = AuthConsumer();

  useEffect(() => {
    if (user.isAdmin) {
      columns[1].component = (name, product) => (
        <Link to={`/productos/${product._id}`}>{name}</Link>
      );
    }

    return () => delete columns[1].component;
  }, [user]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchedProductName("");
  };

  const handleProductNameSearch = (query) => {
    setSearchedProductName(query);
    setCurrentPage(1);
  };

  const handleColumnSort = (column) => {
    const order = sortedColumn.order === "asc" ? "desc" : "asc";

    setSortedColumn({ ...column, order });
  };

  if (isLoadingCategories || isLoadingProducts)
    return <Spinner animation="border" />;

  let allProducts = products;

  if (!_.isEmpty(selectedCategory)) {
    allProducts = allProducts.filter((product) => {
      return product.category._id === selectedCategory._id;
    });
  }

  if (!_.isEmpty(sortedColumn))
    allProducts = _.orderBy(
      allProducts,
      [sortedColumn.path],
      [sortedColumn.order]
    );

  if (searchedProductName) {
    allProducts = allProducts.filter((product) =>
      product.name.includes(searchedProductName)
    );
  }

  const [filteredProducts, pageProductsCount] = paginate(
    allProducts,
    pageSize,
    currentPage
  );

  return (
    <>
      <Row>
        <Col sm={12} md={4}>
          <ListGroup
            items={categories}
            selectedItem={selectedCategory}
            onItemSelect={handleSelectCategory}
            propertyValue="name"
          />
        </Col>
        <Col sm={12} md={8}>
          <h2>Products ({pageProductsCount})</h2>
          <SearchBox
            value={searchedProductName}
            onSearch={handleProductNameSearch}
            placeholder="Busca tarea"
          />
          <Table
            items={filteredProducts}
            columns={columns}
            onSort={handleColumnSort}
          />
          <Pagination
            pageSize={pageSize}
            itemsCount={allProducts.length}
            currentPage={currentPage}
            onChangePage={setCurrentPage}
          />
        </Col>
      </Row>
    </>
  );
}

export default Catalog;
