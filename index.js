require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const {resolve} = require('path')
const userRoute = require("./src/routes/userRouter");
const expenseRoute = require("./src/routes/expenseRouter");
const saleRoute = require("./src/routes/saleRouter");
const tokenRouter = require("./src/routes/tokenRouter");
const app = express();

mongoose
  .connect(process.env.CONECTIONSTRING)
  .then(() => {
    app.emit(true);
    console.log("conectou com o banco de dados");
  })
  .catch((e) => console.log(e));
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routers

app.use("/users/", userRoute);
app.use("/expense/", expenseRoute);
app.use("/sale/", saleRoute);
app.use("/token/", tokenRouter);

app.on(true, () => {
  app.listen(port, () => {
    console.log(`Servidor esta rodando http://localhost:${port}`);
  });
});
