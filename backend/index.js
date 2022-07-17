const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const router = express.Router();
const { register, login } = require("./controllers/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 4000;

app.use("/register", register);
app.use("/login", login);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

mongoose.connect('mongodb://localhost:27017/', () => {
    console.log("Connected to MongoDB.");
})