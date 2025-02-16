import dotenv from "dotenv";
dotenv.config();
import express, { Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection";
import deserialize from "./middleware/deserializeUser";
import router from "./route/v1"
import config from "../config/default";


const app = express();

const port = config.port;
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Payport API Documentation",
    version: "1.0.0",
    description: "API documentation for Payport TypeScript application",
  },
  servers: [
    {
      url: "https://payport-f7rg.onrender.com",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT", // Optional, indicates the token type
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    "./src/route/*.ts", // Matches: /routes/users.ts
    "./src/route/**/*.ts",
    "./src/route/v1/**/*.ts",
  ],
};
const swaggerSpec = swaggerJSDoc(options);

var corOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  setHeaders: function (res: Response, path: string, stat: any) {
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  },
};

app.use(express.json());
app.use(cors(corOptions));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.disable("x-powered-by");

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(deserialize);
app.use("/api/v1", router);

app.listen(port,"0.0.0.0", () => {
  console.log(`listening on port ${port}`);
  connect();
});
  
export default app;