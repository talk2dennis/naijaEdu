import { Express } from "express";
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';


dotenv.config();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const url = NODE_ENV === 'production'
  ? 'https://movieplane.onrender.com'
  : `http://localhost:${PORT}`;


// swagger options
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "NaijaEdu API",
      version: "1.0.0",
      description:
        "Comprehensive API documentation for NaijaEdu, an educational platform offering user authentication, management, learning modules, and interactive quizzes. Features include registration, login, Google social authentication, and endpoints to enhance user engagement and educational experience.",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      contact: {
        name: "Dennis Adigwe",
        url: "https://github.com/dennisadigwe",
        email: "adigwedennis@email.com",
      },
    },
    servers: [
      {
        url,
        description: NODE_ENV === 'production' ? "Production server" : "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format: Bearer <token>",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/**/*.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

// Function to setup swagger docs in Express
export const setupSwaggerDocs = (app: Express) => {
  app.use(
    "/api-docs", swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }),
  );
  console.log(`Swagger docs available at ${url}/api-docs`);
};