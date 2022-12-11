require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const plansRoute = require("./routes/plansRoute");
const userRoute = require("./routes/userRoute");
const app = express();
app.use(express.json());
app.use("/api/plans/", plansRoute);
app.use("/api/users/", userRoute);
app.use((req: any, res: any, next: any) => {
  const error = new Error(`Not found -${req.originalUrl}`);
  res.status(404);
  next(error);
});
app.use((error: any, req: any, res: any) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: error.stack,
  });
});
mongoose
  .connect(process.env.SECRET)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Listening to the port and connecting to the db.");
    })
  )
  .catch((error: any) => {
    console.log(error);
  });
