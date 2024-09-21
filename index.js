require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const {resolve} = require('path')
const userRoute = require("./src/routes/userRouter");
const productRoute = require("./src/routes/productRouter");
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
app.use(express.static(resolve(__dirname,"uploads")))

//routers

app.use("/users/", userRoute);
app.use("/product/", productRoute);
app.use("/token/", tokenRouter);

app.on(true, () => {
  app.listen(port, () => {
    console.log(`Servidor esta rodando http://localhost:${port}`);
  });
});
