const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  const accounts = db('accounts');
  return accounts;
};

const getById = id => {
  // DO YOUR MAGIC
  const account = db('accounts').where({id});
  return account;
}

const create = async account => {
  // DO YOUR MAGIC
  const newAccount = db('accounts').insert(account);
  return newAccount;
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  return db('accounts').update(account).where({id});
}

const deleteById = async id => {
  // DO YOUR MAGIC
  return db('accounts').del().where({id});
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
