import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevOps Microservices Playground API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5005",
      },
      {
        url: "http://localhost:5001",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app, port) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
}
