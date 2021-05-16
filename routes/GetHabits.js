const express = require("express");
const router = express.Router();
const { Users } = require("../models/users");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.body.user._id;
    const user = await Users.findOne({ _id: userId });
    if (!user) return res.status(400).send("No user found");
    res.send(user.habits);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
