import express from "express";
import fs from "fs";
const morgan = require("morgan");
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

const app = express();

// DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("DB connection err: ", err));

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// route middleware

//app.use("/api", router);
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

// port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
