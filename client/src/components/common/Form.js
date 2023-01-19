import Button from "react-bootstrap/Button";
import renderInput from "./FormInputs";
import Joi from "joi-browser";
import _ from "lodash";

const Form = ({
  inputs = [],
  header = "",
  onSubmit = () => {},
  submitLabel = "Enviar",
  validSchema,
  inputValuesState = {},
  errorState = {},
}) => {
  const [inputValues, setInputValues] = inputValuesState;
  const [error, setError] = errorState;

  const handleChange = ({ target: input }) => {
    let value = input.value;

    if (input.type === "file") {
      value = URL.createObjectURL(input.files[0]);
    }

    setInputValues((prevValue) => ({
      ...prevValue,
      [input.name]: value,
    }));
  };

  const validate = () => {
    const { error } = Joi.validate(inputValues, validSchema);
    if (!error) return null;

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validate();

    if (error) {
      const { message, path } = error.details[0];
      return setError({ [path]: message });
    }

    setError({});

    let formData = inputValues;
    if (_.find(inputs, { type: "image" })) formData = new FormData(e.target);

    onSubmit(formData);
  };

  return (
    <>
      <h2>{header}</h2>
      <form onSubmit={handleSubmit}>
        {inputs.map(({ name, label, type = "text", ...rest }) => {
          const Input = renderInput[type];

          return (
            <Input
              key={name}
              name={name}
              label={label}
              value={inputValues[name] || ""}
              errors={error}
              onChange={handleChange}
              type={type}
              {...rest}
            ></Input>
          );
        })}

        <Button disabled={validate()} type="submit">
          {submitLabel}
        </Button>
      </form>
    </>
  );
};

export default Form;
