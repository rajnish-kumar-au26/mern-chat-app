const jwt = require("jsonwebtoken");
const Secret = process.env.JWT_SECRET;

class JwtValidation {
  generateToken = (userId) => {
    try {
      if (!userId) {
        throw {
          message: "UserId Required to Create JWT Token!",
        };
      }

      const token = jwt.sign({ userId }, Secret, { expiresIn: "10h" });

      return {
        message: "Jwt Token created successfully",
        status: 200,
        error: false,
        token: token,
      };
    } catch (error) {
      return {
        message: error.message,
        status: 400,
        error: true,
      };
    }
  };

  verifyToken = (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      // console.log("Token: ", token);
      // console.log("Secret: ", Secret);
      var data = jwt.verify(token, Secret);
      // console.log(data);
      req.userId = data.userId;
      next();
    } catch (error) {
      // console.log("Jwt validation error: ", error);

      res.status(400).send({
        message: "Invalid JwtTokent/Expired",
        error: true,
      });
    }
  };
}

module.exports = new JwtValidation();
