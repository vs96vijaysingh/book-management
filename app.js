const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const dotEnv = require("dotenv");
dotEnv.config();

const mongoose = require("mongoose");
const db = require("./config/db");

const PORT = process.env.PORT || 4545;
app.get("/", (req, res) => {
  console.log("server checking");
  res.send("Working fine....");
});
//user route
const userRoute = require("./route/user");
app.use("/api/v1/", userRoute);

//book route
const bookRoute = require("./route/book");
app.use("/api/v1/", bookRoute);

//create server
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}/`);
});
