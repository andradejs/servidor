const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).send({ error: "credenciais inválidas" });
    }

    const isMacth = await bcrypt.compare(password, user.password);


    if (!isMacth){
        res.status(400).send({error: "credenciais inválidas"})
    }

    res.send({message: "login bem-sucedido", user})
  } catch (error) {
    
  }
};
