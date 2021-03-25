const Account = require('../accounts/accounts-model');
const { response } = require('../server');

const checkAccountPayload = (req, res, next) => {
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

const checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const newAccount = req.body;
  const list = await Account.getAll();

  try {
    for(let i = 0; i < list.length; i++) {
      if(newAccount.name === list[i].name) {
        res.status(400).json({ message: "that name is taken" });
      } else {
        next();
      };
    };
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error });
  };
  
};

const checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id);
    if(account) {
      req.account = account;
      next();
    } else {
      res.status(400).json({ message: "account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error });
  }
};

module.exports = { checkAccountId, checkAccountNameUnique, checkAccountPayload};