const express = require("express");
var cors = require('cors')
const app = express();
const PORT = process.env.PORT_ONE || 5000;
const mongoose = require("mongoose");
const User = require("./User"); //Import User Schema database
const jwt = require("jsonwebtoken");
const Redis = require("ioredis");

const default_expiration = 3600;
app.use(express.json()); //to handle body coming from front end
app.use(cors())

// Redis setup
// const redisClient = new Redis({
//   host: "127.0.0.1",
//   port: 6379,
//   password: "Yehya403",
// });
// redisClient.on("error", (error) => console.error(`Error: ${error}`));
// redisClient.on("connect", () => {
//   console.log("Redis client connected");
// });

//Initialize Database for the Auth-Service
mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1/auth-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Auth-Service DB Connected`);
  })
  .catch((err) => {
    console.log(`Error while connecting to the database: ${err}`);
  });

//Two Routes, one for register and one for login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body; //get the email and password from the body

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User doesn't exist" });
  } else {
    //Check if the entered password is valid.
    if (password !== user.password) {
      return res.json({ message: "Password is incorrect" });
    }

    const payload = {
      //payload is something that which consists uses basic details likeemail and name or something like that
      email,
      name: user.name,
    };
    jwt.sign(payload, "secret", (err, token) => {
      if (err) console.log(err);
      else {
        return res.json({ message: "Logged Succesfully", token: token }); //return token to the user
      }
    });
  }
});

app.post("/auth/register", async (req, res) => {
  const { name, email, phone, password, rePassword } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({ message: "User already exists" });
  } else {
    const newUser = new User({
      name,
      email,
      phone,
      password,
      rePassword,
    });
    newUser.save();
    return res.json({ message: "User created successfully", user: newUser });
  }
});

// Add a new route to get all registered users
app.get("/auth/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Auth Service is running at ${PORT}`);
  console.log(`CORS-enabled web server listening on port ${PORT}`)
});

//Caching
// function getOrSetCache(key, cb) {
//   return new Promise((resolve, reject) => {
//     redisClient.get(key, async (error, data) => {
//       if (error) return reject(error);
//       if (data != null) {
//         console.log("Cache Hit");
//         return resolve(JSON.parse(data));
//       }
//       const freshData = await cb();
//       redisClient.set(key, JSON.stringify(freshData), "EX", default_expiration);
//       resolve(freshData);
//     });
//   });
// }
