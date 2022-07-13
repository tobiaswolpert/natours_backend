const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connection Successful"));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {});

process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  server.close(() => {
    process.exit(1);
  });
});
