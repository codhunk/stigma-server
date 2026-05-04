const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stigma API Documentation",
      version: "1.0.0",
      description: "API documentation for the Stigma server",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
  },
  apis: ["./src/routes/v1/*.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;
