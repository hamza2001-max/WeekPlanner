require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const plansRoute = require("./routes/plansRoute");
const userRoute = require("./routes/userRoute");
const app = express();
app.use(express.json());
app.use("/api/plans/", plansRoute);
app.use("/api/users/", userRoute);
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
