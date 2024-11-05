const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD en Sequalize - API de TrailerFlix",
      version: "1.0.0",
      description:
        "Documentación generada con Swagger para la API del proyecto TrailerFlix",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/contenidoRoutes.js"],
};

// Generar la especificación de Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
