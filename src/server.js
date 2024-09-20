require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRouter");
const productRoute = require("./routes/productRouter");
const tokenRouter = require("./routes/tokenRouter");
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
app.use("/product/", productRoute);
app.use("/token/", tokenRouter);

app.on(true, () => {
  app.listen(port, () => {
    console.log(`Servidor esta rodando http://localhost:${port}`);
  });
});
