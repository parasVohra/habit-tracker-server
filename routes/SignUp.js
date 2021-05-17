const express = require("express");
const router = express.Router();
const { Users, validate } = require("../models/users");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user already exits

    const { email } = req.body;

    let findUser = await Users.findOne({ email: email });
    //exits then send response error with message
    if (findUser) {
      return res
        .header("Content-Type", "application/json")
        .status(401)
        .send({ error: `user with email ${email} is already exits` });
    } else {
      // save the user
      //take the data from the request and encrypt the password
      const user = new Users(
        _.pick(req.body, ["firstName", "lastName", "email", "password"])
      );

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      const savedResponse = await user.save();

      console.log(savedResponse);

      // check is the modified or the n value of the response ;

      const token = user.generateAuthToken();

      res
        .header("Content-Type", "application/json")
        .status(200)
        .send({ token: token });

      // using the bcrypt
      // then save the user in the db
      // if user is saved then generate the token
      // send the token as Response
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
