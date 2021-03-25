const router = require('express').Router();
const Accounts = require('./accounts-model');
const middleware = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving Accounts", error: err});
    });
});

router.get('/:id', middleware.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account);
});

router.post('/', middleware.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await Accounts.create(req.body);
  res.status(201).json({ message: "Account created!" });
});

router.put('/:id', middleware.checkAccountPayload, middleware.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await Accounts.updateById(req.params.id, req.body);
  res.status(200).json({ message: "Account Updated!" }, account);
});

router.delete('/:id', middleware.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  await Accounts.deleteById(req.params.id);
  res.status(204).send("Account Deleted!");
});

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
  next()
})

module.exports = router;
