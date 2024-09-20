const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(401).send({
          errors: ["credenciais inválidas"],
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: ["usuário não existe"],
        });
      }

      if (!(await bcrypt.compareSync(password, user.password))) {
        return res.status(401).json({
          errors: ["senha inválida"],
        });
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.PASSWORDTOKEN, {
        expiresIn: process.env.TIMETOKEN,
      });
      return res.json({ token });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new TokenController();
