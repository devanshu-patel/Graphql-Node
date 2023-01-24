const express = require("express");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
const mongoose = require("mongoose");
const { graphController } = require("./graphql");
const { validate_token } = require("./utils/jwt/validate_token");
const app = express();

//parsing all request to JSON
app.use(express.json());

//require database connection
require("./database/connection");

app.use(
  "/graphql",
  async (req, res, next) => {
    req.isAuthenticated = false;
    try {
      const data = await validate_token(
        req.headers.authorization,
        process.env.ACCESS_TOKEN_SECRET
      );
      req.payload = data;
      req.isAuthenticated = true;
    } catch (error) {
      req.isAuthenticated = false;
    } finally {
      return next();
    }
  },
  graphController
);
app.listen(process.env.PORT, () => {
  console.log(`App is running on ${process.env.PORT}`);
});
