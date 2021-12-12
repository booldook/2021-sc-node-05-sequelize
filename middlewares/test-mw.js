/* module.exports = (req, res, next) => {
  // ...
  next();
}; */

module.exports = (_name) => {
  return (req, res, next) => {
    req.user = {};
    req.user.name = _name;
    next();
  };
};
