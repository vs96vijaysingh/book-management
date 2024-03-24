const mongoose = require("mongoose");
const dotEnv = require("dotenv").config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;
console.log("DB_CONNECTION_STRING:", dbConnectionString);

mongoose
  .connect(dbConnectionString, {
    dbName: "BookManagement",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));
