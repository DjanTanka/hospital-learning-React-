const bcrypt = require('bcryptjs');
const User = require('../../db/models/user/index');

module.exports.getAllUsers = (req, res) => {
  User.find().then(result => {
    res.send({data: result});
  });
};

module.exports.addNewUser = async (req, res) =>  {
  const candidateLogin = await User.findOne({login: req.body.login});
  if (candidateLogin) {
    res.status(409).send({err: "This login is occupied"});
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(password, salt)
    });
    user.save().then(result => {
      res.status(201).send("пользователь добавлен");
    });   
  };
};

module.exports.deleteUser = (req, res) =>  {
  User.deleteOne({_id: req.query._id}).then(result => {
    User.find().then(result => {
      res.send({data: result});
    });
  }).catch(err => console.log(err));
};
