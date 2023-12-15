const app = require("./app");
const cloudinary = require("cloudinary");
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
if (process.env.NODE_PRODUCTION !== "PRODUCTION") {
  require("dotenv").config();
}
app.listen(process.env.PORT, () => {
  console.log(`Server is Running in PORT ${process.env.PORT}`);
});
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  process.exit(1);
});
