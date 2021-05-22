const express = require("express");
const router = express.Router();
const { Users } = require("../models/users");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    // check if user exits

    const { email } = req.body;

    let userFound = await Users.findOne({ email: email });
    //exits then send response error with message
    console.log(userFound);
    if (!userFound) {
      return res
        .header("content-type", "application/json")
        .status(401)
        .send({
          error: `User with email "${email}" doesn't exits \uD83D\uDE43   . Please Try again or SignUp \uD83D\uDE07 `,
        });
    }
    if (userFound) {
      // if find user verify the user password
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        userFound.password
      );
      console.log(isValidPassword);

      if (!isValidPassword) {
        return res
          .header(("content-type", "application/json"))
          .status(401)
          .send({
            error: `Password is incorrect \uD83E\uDD37\u200D\u2642\uFE0F.  Please try again \uD83D\uDE42`,
          });
      } else {
        const token = userFound.generateAuthToken();
        res
          .header("content-type", "application/json")
          .status(200)
          .send({ token: token });
      }
    }
  } catch (err) {
    console.log(err);

    res
      .header("Content-Type", "application/json")
      .status(500)
      .send({ error: err });
  }
});

module.exports = router;
