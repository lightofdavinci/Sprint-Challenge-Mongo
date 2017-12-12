const Budget = require('../models/budget');
const Expense = require('../models/expense');

const summary = (req, res) => {
  const { id } = req.params;
  Budget.findById( id ).then((budget) => {
    Expense
      .aggregate([{ $group: { _id : "$budget", amount : { $sum : "$amount" }}}])
      .exec()
      .then((result) => {
        res.json({ summary: budget.budgetAmount - result[0].amount });
      })
      .catch((err) => {
        res.status(500);
        res.json({ errorMessage: err.message });
        return;
      });
  })
  .catch((err) => {
    res.status(500);
    res.json({ errorMessage: err.message });
    return;
  });
}

const aggregatedByCategory = (req, res) => {
  Expense
    .aggregate([{ $group: { _id : "$category", amount : { $sum : "$amount" }}}
      ,{ $sort: { total: -1 } }
    ])
    .exec()
    .then((result) => {
      res.json(result)
    }).catch((err) => {
      res.status(500);
      res.json({ errorMessage: err.message });
      return;
    });
}

module.exports = {
  summary,
  aggregatedByCategory
};