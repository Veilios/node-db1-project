const User = require('../accounts/accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try {
    if(req.body && Object.keys(req.body).length>0) {
      if(req.body.name && req.body.budget) {
        if(typeof req.body.name !== 'string') {
          res.status(400).json({ message: "name of account must be a string" });
        } else if ((req.body.name).length < 3 || (req.body.name > 100)) {
          res.status(400).json({ message: "name of account must be between 3 and 100" });
        } else if (typeof req.body.budget !== 'number') {
          res.status(400).json({ message: "budget of account must be a number" });
        } else if ((req.body.budget).length > 0 || (req.body.budget).length < 1000000) {
          res.status(400).json({ message: "budget of account is too large or too small" });
        } else {
          next();
        }
      } else {  
        res.status(400).json({ message: "name and budget are required" });
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
  const newUser = req.body;
  const list = await User.getAll();

  try {
    for(let i = 0; i < list.length; i++) {
      if(newUser.name === list[i].name) {
        res.status(400).json({ message: "Account Name has been taken" });
      } else {
        next();
      };
    };
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error });
  };
  
};

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
