const jwt = require("jsonwebtoken");

const middlewareAuth = {
  //? verifyToken

  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token;
      jwt.verify(accessToken, '123456', (error, user) => {
        if (error) {
          res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You're not authenticated");
    }
  },

  verifyOwnerAndAdmin: (req, res, next) => {
    middlewareAuth.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.role == "admin") {
        next();
      } else {
        res.status(403).json("This action is unauthorized.");
      }
    });
  },

  verifyAdmin: (req, res, next) => {
    middlewareAuth.verifyToken(req, res, () => {
      if (req.user.role == "admin") {
        next();
      } else {
        res.status(403).json("This action is unauthorized.");
      }
    });
  },
};

module.exports = middlewareAuth;
