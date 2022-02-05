import express from "express";
import cors from "cors";

export function buildApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  return app;
}
