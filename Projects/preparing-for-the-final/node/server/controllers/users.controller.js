let users = [];

const getUsers = (req, res) => {
  res.json(users);
};

const createUser = (req, res) => {
  const user = req.body;
  users.push(user);
  res.json(user);
};

module.exports = {
  getUsers,
  createUser,
};
