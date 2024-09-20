const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class UserController {
  async storeUser(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ errors: ["Erro ao criar usuário"] });
    }
  }

  async updateUser(req, res) {
    try {
      const { name, email, password } = req.body;

      const newPassword = await bcrypt.hashSync(password, 10);

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, password: newPassword },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!user) {
        return res.status(404).json({ errors: ["Usuário não encontrado"] });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json({ errors: ["Erro ao atualizar usuário"] });
    }
  }

  async deleteUser(req, res) {
    try {
      const userDeleted = await User.findByIdAndDelete(req.params.id, {
        new: true,
      });

      if (!userDeleted) {
        return res.status(404).json();
      }

      res.json(userDeleted);
    } catch (error) {
      res.status(500).json({ errors: ["Erro"] });
    }
  }
}

module.exports = new UserController();
