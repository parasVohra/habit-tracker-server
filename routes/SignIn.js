const express = require("express");
const router = express.Router();
const { Users } = require("../models/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");

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
        .send({ error: `user with email ${email} doesn't exits` });
    } else if (userFound) {
      // if find user verify the user password
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        userFound.password
      );

      if (!isValidPassword) {
        return res
          .header(("content-type", "application/json"))
          .status(401)
          .send({ error: "Invalid password" });
      } else {
        const token = userFound.generateAuthToken();
        res
          .header("content-type", "application/json")
          .status(200)
          .send({ token: token });
      }
    }
  } catch (err) {
    console.log(error);

    res
      .header("Content-Type", "application/json")
      .status(500)
      .send({ error: err });
  }
});

module.exports = router;
