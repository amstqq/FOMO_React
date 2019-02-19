import config from "./config";
import apiRouter from "./api";
import path from "path";

import express from "express";
const app = express();

app.use("/api", apiRouter);
app.use(express.static(path.join(__dirname, "client", "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.listen(config.port, () => {
  console.info("Express listening on port", config.port);
});
