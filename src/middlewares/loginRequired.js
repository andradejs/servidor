const jwt = require("jsonwebtoken");

function loginRequired(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["Login required"],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const dados = jwt.verify(token, `asjlfjaslfjlasdfj`);
    const { id, email } = dados;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ["Token espirado ou inválido"],
    });
  }
}

module.exports = loginRequired;
