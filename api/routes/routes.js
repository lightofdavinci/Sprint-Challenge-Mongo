const budgetControllers = require('../controllers/budgetControllers');
const categoryControllers = require('../controllers/categoryControllers');
const expenseControllers = require('../controllers/expenseControllers');
const stretchControllers = require('../controllers/stretchControllers');

module.exports = app => {
  // Todo: Fill in your routes here
  app
    .route('/budget')
    .get(budgetControllers.getBudget)
    .post(budgetControllers.createBudget);

  app
    .route('/category')
    .get(categoryControllers.getAllCategories)
    .post(categoryControllers.createCategory);

  app
    .route('/expense')
    .post(expenseControllers.expenseCreate)
    .get(expenseControllers.getExpense);

  // stretch
  app
    .route('/budget/:id/summary')
    .get(stretchControllers.summary);
  app
    .route('/expenses?aggregatedBy=category')
    .get(stretchControllers.aggregatedByCategory);
};
