import { useEffect, useState } from "react";
import _ from "lodash";
import Form from "../components/common/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import category from "../services/categoryService";

import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const AdminCategories = () => {
  const [inputValues, setInputValues] = useState({});
  const [error, setError] = useState({});
  const [header, setHeader] = useState("Crear nueva categoría");
  const [submitLabel, setSubmitLabel] = useState("Crear");

  const { categoryId } = useParams();

  const navigate = useNavigate();

  const schema = {
    name: Joi.string().required(),
  };

  const handleSubmit = async (formData) => {
    try {
      if (categoryId) {
        const updatedCategory = await category.updateCategory(
          categoryId,
          formData
        );
        toast.success(`Categoría "${updatedCategory.name}" actualizada"`);
      } else {
        const newCategory = await category.createCategory(formData);
        toast.success(`Categoría "${newCategory.name}" creada"`);
        reset("create");
      }
    } catch (err) {
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Al pulsar aceptar borrará la categoría de forma definitiva"
      )
    ) {
      const deletedCategory = await category.deleteCategory(categoryId);
      toast.success(`Categoría "${deletedCategory.name}" eliminada"`);
      reset("create");
      navigate("/categorias", { replace: true });
    }
  };

  useEffect(() => {
    if (!categoryId) return;

    async function isValidCategory(id) {
      try {
        const currentCategory = await category.getCategoryById(id);
        setInputValues(_.pick(currentCategory, "name"));
        reset("update");
      } catch (err) {
        if (err.response.status === 400 || err.response.status === 404) {
          toast.error("Categoría no encontrada");
          navigate("/categorias", { replace: true });
        }
      }
    }

    isValidCategory(categoryId);

    console.log(categoryId);
  }, []);

  return (
    <>
      <Form
        inputs={[{ name: "name", label: "Categoría" }]}
        onSubmit={handleSubmit}
        header={header}
        submitLabel={submitLabel}
        validSchema={schema}
        inputValuesState={[inputValues, setInputValues]}
        errorState={[error, setError]}
      />
      {categoryId && (
        <Button className="btn-danger" onClick={handleDelete}>
          Elimina categoría
        </Button>
      )}
    </>
  );

  function reset(context) {
    const renderForm = {
      create: {
        header: "Crear nueva categoría",
        submitLabel: "Crear",
      },
      update: {
        header: "Actualizar categoría",
        submitLabel: "Actualizar",
      },
    };

    setError({});

    if (context === "create") setInputValues({});

    setHeader(renderForm[context].header);
    setSubmitLabel(renderForm[context].submitLabel);
  }
};

export default AdminCategories;
