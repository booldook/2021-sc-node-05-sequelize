module.exports = (req, res, next) => {
  req.user.name += " first";
  next();
};
