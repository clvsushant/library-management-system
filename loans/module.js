const { loanSchema } = require('./validation');
const { Loan } = require('../database');

exports.createLoan = async (loanPayload) => {
  await loanSchema.validateAsync(loanPayload);
  return Loan.create(loanPayload);
};

exports.getLoanById = async (loanId) => {
  const loan = await Loan.findByPk(loanId);
  if (!loan) throw new Error('Loan not found. Please enter valid ID');
  return loan;
};

exports.getAllLoan = async () => {
  return await Loan.findAll();
};

exports.updateLoanById = async (loanId, loanPayload) => {
  const loan = await Loan.findByPk(loanId);
  if (!loan) throw new Error('Loan not found. Please enter valid ID');
  loan.set(loanPayload);
  loan.save();
  return loan;
};

exports.deleteLoanById = async (bookId) => {
  const loan = await Loan.findByPk(bookId);
  if (!loan) throw new Error('Loan not found. Please enter valid ID');
  await loan.destroy();
  return 'Loan is deleted successfully';
};
