const validate = (schema) => (req, res, next) => {
  if (!schema) return next();
  
  const { value, error } = schema.validate(req.body);
  
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(", ");
    return res.status(400).json({ message: errorMessage });
  }
  
  Object.assign(req, value);
  return next();
};

module.exports = validate;
