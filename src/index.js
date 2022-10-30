const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const categoryRoute = require("./routers/category");
const productRoute = require("./routers/product");
const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");

dotenv.config();

mongoose.connect(process.env.MONGOOSE_URL, () => {
  console.log("connect DB");
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("common"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.json("HOME");
});

// ! ROUTE

app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// ? authentication : xac thuc
// ? authorization : phan quyen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
