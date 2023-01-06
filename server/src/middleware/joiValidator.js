module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);

    if (error) return res.status(400).send(error.details[0].message);

    next();
  };
};
