import { useEffect, useState } from "react";
import _ from "lodash";
import Form from "../components/common/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import product from "../services/productService";
import useCategories from "../hooks/useCategories";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const AdminProducts = () => {
  const [inputValues, setInputValues] = useState({});
  const [error, setError] = useState({});
  const [header, setHeader] = useState("Crear nueva producto");
  const [submitLabel, setSubmitLabel] = useState("Crear");
  const { isLoadingCategories, categories } = useCategories();
  const { productId } = useParams();

  const navigate = useNavigate();

  const schema = {
    name: Joi.string().required(),
    price: Joi.number().required(),
    categoryId: Joi.string().required(),
    image: Joi.string().required(),
  };

  const handleSubmit = async (formData) => {
    try {
      if (productId) {
        const updatedProduct = await product.updateProduct(productId, formData);
        toast.success(`Producto "${updatedProduct.name}" actualizado"`);
      } else {
        const newProduct = await product.createProduct(formData);
        toast.success(`Producto "${newProduct.name}" creado"`);
        reset("create");
      }
    } catch (err) {
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Al pulsar aceptar borrará el producto de forma definitiva"
      )
    ) {
      const deletedProduct = await product.deleteProduct(productId);
      toast.success(`Producto "${deletedProduct.name}" eliminado"`);
      reset("create");
      navigate("/productos", { replace: true });
    }
  };

  useEffect(() => {
    if (!productId) return;

    async function isValidProduct(id) {
      try {
        const { name, price, image, category } = await product.getProductById(
          id
        );

        setInputValues({ name, price, image, categoryId: category._id });
      } catch (err) {
        if (err.response.status === 400 || err.response.status === 404) {
          toast.error("Producto no encontrado");
          navigate("/productos", { replace: true });
        }
      }
    }

    isValidProduct(productId);
  }, []);

  if (isLoadingCategories || (productId && _.isEmpty(inputValues))) return null;

  return (
    <>
      <Form
        inputs={[
          { name: "name", label: "Nombre" },
          { name: "price", label: "Precio", type: "number" },
          {
            name: "categoryId",
            label: "Categoría",
            type: "select",
            options: categories,
          },
          { name: "image", label: "Image", type: "image" },
        ]}
        onSubmit={handleSubmit}
        header={header}
        submitLabel={submitLabel}
        validSchema={schema}
        inputValuesState={[inputValues, setInputValues]}
        errorState={[error, setError]}
      />
      {productId && (
        <Button className="btn-danger" onClick={handleDelete}>
          Elimina producto
        </Button>
      )}
    </>
  );

  function reset(context) {
    const renderForm = {
      create: {
        header: "Crear nueva producto",
        submitLabel: "Crear",
      },
      update: {
        header: "Actualizar producto",
        submitLabel: "Actualizar",
      },
    };

    setError({});

    if (context === "create") setInputValues({});

    setHeader(renderForm[context].header);
    setSubmitLabel(renderForm[context].submitLabel);
  }
};

export default AdminProducts;
