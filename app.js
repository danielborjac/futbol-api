// const express = require("express");
import fieldsRoutes from "./routes/fieldsRoutes.js";
import matchesRoutes from "./routes/matchesRoutes.js";
import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token === "1234") {
    next(); // continuar con el flujo
  } else {
    res.status(401).json({ error: "No autorizado" });
  }
};
const loggerMiddleware = (req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
};

app.use(loggerMiddleware);

app.use("/fields", authMiddleware, fieldsRoutes);
app.use("/matches", matchesRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  // guardar este registro con la hora en un log
  res.status(500).json({ error: "Problema interno en el servidor" });
});

app
  .listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  })
  .on("error", (err) => {
    console.error(`Error al iniciar el servidor con error: ${err}`);
  });
