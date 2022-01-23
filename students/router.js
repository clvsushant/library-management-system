const { Router } = require('express');
const {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudentById,
  updateStudent,
  getLoans,
} = require('./module');
const route = Router();

route.post('/', async (req, res) => {
  try {
    res.status(200).send(await createStudent(req.body));
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

route.get('/', async (req, res) => {
  try {
    res.status(200).send(await getAllStudents());
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

route.post('/:studentId', async (req, res) => {
  try {
    res.status(200).send(await updateStudent(req.params.studentId, req.body));
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

route.get('/:studentId', async (req, res) => {
  try {
    res.status(200).send(await getStudentById(req.params.studentId));
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

route.delete('/:studentId', async (req, res) => {
  try {
    res.status(200).send(await deleteStudentById(req.params.studentId));
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

route.get('/:studentId/history', async (req, res, next) => {
  try {
    const student = await getStudentById(req.params.studentId);
    const loans = await getLoans(req.params.studentId);
    await Promise.all([student, loans]).then((results) => {
      res.status(200).send(results);
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = route;
