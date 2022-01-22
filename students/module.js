const { studentSchema } = require('./validation');
const { Student, Book } = require('../database');

exports.createStudent = async (studentPayload) => {
  await studentSchema.validateAsync(studentPayload);
  return Student.create(studentPayload);
};

exports.getAllStudents = async () => {
  return await Student.findAll();
};

exports.getStudentById = async (studentId) => {
  const student = await Student.findByPk(studentId);
  if (!student) throw new Error('Student not found. Please enter valid ID');
  return student;
};

exports.updateStudent = async (studentId, studentPayload) => {
  const student = await Student.findByPk(studentId);
  if (!student) throw new Error('Student not found. Please enter valid ID');
  student.set({
    studentName: studentPayload.studentName,
  });
  await student.save();
  return student;
};

exports.deleteStudentById = async (studentId) => {
  const student = await Student.findByPk(studentId);
  if (!student) throw new Error('Student not found. Please enter valid ID');
  await student.destroy();
  return 'Student is deleted successfully';
};
