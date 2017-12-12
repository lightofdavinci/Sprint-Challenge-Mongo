const mongoose = require('mongoose');

const Budget = require('../models/budget');

const getBudget = (req, res) => {
  Budget.find({})
    .exec()
    .then((budget) => {
      res.status(200).json(budget);
    })
    .catch((err) => {
      res.status(500).json({ err });
      return;
    });
}

const createBudget = (req, res) => {
  const { title, budgetAmount } = req.body;
  const newBudget = Budget({ title, budgetAmount });
  newBudget
    .save()
    .then((createdBudget) => {
      res.status(201).json(createdBudget);
    })
    .catch((err) => {
      res.status(500);
      res.json({ errorMessage: err.message });
      return;
    });
};

module.exports = {
  createBudget,
  getBudget
};