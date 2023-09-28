const express = require("express");
const connectToMongo = require("./db");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const User = require("./models/user");

connectToMongo();
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Server is running on 3000 port");
});

app.post("/user/register", async (req, res) => {
  try {
    const { name, email, age, location } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ error: "User already exists" });
    } else {
      const userId = name + uuidv4();
      await User.create({
        userId,
        name,
        email,
        age,
        location,
      });

      res.status(201).json({ userId });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
