const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const categoryRoute = require("./routers/category");
const productRoute = require("./routers/product");
const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");

const ImageModel = require("./image.model");
const { application } = require("express");

dotenv.config();

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("common"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, "public/images");
    } else {
      cb(new Error("not image"), false);
    }
  },
  filename: function (req, file, cb) {
    image = file.originalname;
    cb(null, image);
  },
});
let image;
var upload = multer({ storage: storage });

app.post("/img", upload.single("image"), (req, res) => {
  const newImage = new ImageModel({
    name: req.body.name,
    image: {
      data: image,
    },
  });
  newImage.save().then(() => {
    res.send("sedajjkfkbsdk");
  });
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
