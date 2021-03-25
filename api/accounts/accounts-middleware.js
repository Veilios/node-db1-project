const User = require('../accounts/accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try {
    if(req.body && Object.keys(req.body).length>0) {
      if(req.body.name && req.body.budget) {
        next();
      } else {  
        res.status(400).json({ message: "Missing required name and/or budget field" });
      };
    } else {
      res.status(400).json({ message: "Missing account data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error });
  }
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
