const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();

//Initializations
app.set("port", process.env.PORT || 4001);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api", require("./Routes/Routes"));

//Server
app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
