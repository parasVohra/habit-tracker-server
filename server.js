const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const db_URI = config.get("mongoURI");
const cors = require("cors");

//Routes Paths
const Habits = require("./routes/Habits");
const GetHabits = require("./routes/GetHabits");
const UpdateHabit = require("./routes/UpdateHabit");
const UpdateIsTracked = require("./routes/UpdateIsTracked");
const SignUp = require("./routes/SignUp");
const SignIn = require("./routes/SignIn");

//connect with mongodb
mongoose
  .connect(db_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDb"))
  .catch((err) => console.error(err));
mongoose.set("useCreateIndex", true);

//use middleware
app.use(express.json());

//enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "'GET, POST, OPTIONS, PUT, PATCH, DELETE'"
  );
  next();
});

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send();
});

//redirect routes to route folder
app.use("/api/saveHabit", Habits);
app.use("/api/getHabits", GetHabits);
app.use("/api/updateHabit", UpdateHabit);
app.use("/api/updateIsTracked", UpdateIsTracked);
app.use("/api/signUp", SignUp);
app.use("/api/signIn", SignIn);

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Server listening at port:${port}`);
});
