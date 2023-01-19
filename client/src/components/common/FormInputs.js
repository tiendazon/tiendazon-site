const Error = ({ msg }) => {
  if (!msg) return;

  return (
    <div className="alert alert-danger" role="alert">
      {msg}
    </div>
  );
};

const InputLayout = ({ children, name, label, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {children}
      <Error msg={errors[name]} />
    </div>
  );
};

const Input = ({ name, label, errors, ...rest }) => {
  return (
    <InputLayout name={name} label={label} errors={errors}>
      <input name={name} id={name} className="form-control" {...rest}></input>
    </InputLayout>
  );
};

const Select = ({ name, label, errors, options, value, onChange, ...rest }) => {
  return (
    <InputLayout name={name} label={label} errors={errors}>
      <select
        name={name}
        id={name}
        defaultValue={value}
        className="form-control"
        onChange={onChange}
      >
        {options.map(({ _id, name }) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        ))}
      </select>
    </InputLayout>
  );
};

const Image = ({ name, label, errors, options, value, type, ...rest }) => {
  return (
    <InputLayout name={name} label={label} errors={errors}>
      {value && (
        <div>
          <img alt="imagen producto" src={value} width="150" />
        </div>
      )}
      <input
        name={name}
        id={name}
        className="form-control"
        type="file"
        {...rest}
      ></input>
    </InputLayout>
  );
};

export default {
  text: Input,
  password: Input,
  image: Image,
  select: Select,
  number: Input,
};
