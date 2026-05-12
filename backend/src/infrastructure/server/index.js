// dotenv MUST be loaded before anything else reads process.env
require("dotenv").config();

const connectDB = require("../database/connection");
const app = require("../../app");

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`,
    );
  });
};

start();
