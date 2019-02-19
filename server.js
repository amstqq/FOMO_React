import apiRouter from "./api";
import path from "path";

import express from "express";
const app = express();

const port = process.env.PORT || 8080;

app.use("/api", apiRouter);
app.use(express.static(path.join(__dirname, "client", "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.listen(port, () => {
  console.info("Express listening on port", port);
});
