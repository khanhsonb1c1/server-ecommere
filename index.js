const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const categoryRoute = require("../src/routers/category");
const productRoute = require("../src/routers/product");
const authRoute = require("../src/routers/auth");
const userRoute = require("../src/routers/user");
const cartRoute = require("../src/routers/cart");
const productInCartRoute = require("../src/routers/productInCart");
const companyRoute = require("../src/routers/company");
const blogRoute = require("../src/routers/blog");
const commentRoute = require("../src/routers/comment");

// dotenv.config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("common"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
// mongoose
//   .connect(process.env.MONGOOSE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("db connected."))
//   .catch((err) => console.log(err, "connect fail."));

mongoose
  .connect(
    "mongodb+srv://admin:admin@gearshopfinal.isqkpz2.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
app.use("/api/cart", cartRoute);
app.use("/api/productInCart", productInCartRoute);
app.use("/api/company", companyRoute);
app.use("/api/blog", blogRoute);
app.use("/api/comment", commentRoute);

// ? authentication : xac thuc
// ? authorization : phan quyen
let PORT = process.env.PORT || 5005
app.listen(PORT, () => console.log(`App running on port: ${PORT}`))
