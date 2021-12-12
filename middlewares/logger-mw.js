const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "../log"),
});

module.exports = morgan("combined", { stream: accessLogStream });
