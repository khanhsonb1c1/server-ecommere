const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
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

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("common"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public/images"));
mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected."))
  .catch((err) => console.log(err, "connect fail."));

app.get("/", (req, res) => {
  res.send("upload file");
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
