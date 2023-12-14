import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "./config/openapi.json" assert { type: "json" };

// Rutas
import rNames from "./routes/r_names.js";

const app = express();

// Settings
app.set("API_PORT", process.env.PORT || 3001);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
	origin: "*",
	methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]
}));

const base = "/api";

app.use(base, rNames);

app.use(`${base}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;