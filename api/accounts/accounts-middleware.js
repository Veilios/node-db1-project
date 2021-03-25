const User = require('../accounts/accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params.id;
  const user = await User.getById(id);

  try {
    if(user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "User not found" });
    };
  } catch (err) {
    res.status(500).json({ message: "Error processing request", error: err});    
  };
};
