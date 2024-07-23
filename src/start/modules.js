require("dotenv/config");

const cors = require("cors");
const cookie = require("cookie-parser");
const fileUpload = require("express-fileupload");

const authRoute = require("../routes/auth.route");
const blogRoute = require("../routes/blog.route");

const modules = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookie());
  app.use(fileUpload());
  
  app.use("/auth", authRoute);
  app.use("/blog", blogRoute);
};

module.exports = modules;
