const { Router } = require('express');
const {
  createLoan,
  getLoanById,
  getAllLoan,
  updateLoanById,
  deleteLoanById,
} = require('./module');
const route = Router();

route.post('/', async (req, res) => {
  try {
    res.status(200).send(await createLoan(req.body));
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

route.get('/', async (req, res) => {
  try {
    res.status(200).send(await getAllLoan());
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

route.get('/:loanId', async (req, res) => {
  try {
    res.status(200).send(await getLoanById(req.params.loanId));
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

route.post('/:loanId', async (req, res) => {
  try {
    res.status(200).send(await updateLoanById(req.params.loanId, req.body));
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

route.delete('/:loanId', async (req, res) => {
  try {
    res.status(200).send(await deleteLoanById(req.params.loanId));
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = route;
