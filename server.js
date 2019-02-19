import apiRouter from "./api";
import path from "path";
// import config from "./config";

import express from "express";
const app = express();

app.use("/api", apiRouter);
app.use(express.static(path.join(__dirname, "client", "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.listen(process.env.port, () => {
  console.info("Express listening on port", process.env.port);
});
