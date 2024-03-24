const express = require("express");
const route = express.Router();

const UserController = require("../controller/UserController");
const middleware = require("../middleware/auth");

route.post("/login", UserController.loginUser);
route.get("/user", UserController.getAllUser);
route.get("/user/:id", UserController.getUserDetail);
route.post("/user", UserController.createUser);
route.put("/user/:id", UserController.updateUser);
route.patch("/user", UserController.updateUserSegment);
route.delete("/user/:id", UserController.deleteUser);

module.exports = route;
