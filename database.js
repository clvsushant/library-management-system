const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite3',
});

const Book = sequelize.define('Book', {
  bookId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookAuthor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Student = sequelize.define('Student', {
  studentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Loan = sequelize.define('Loan', {
  loanId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  outDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Book.hasOne(Loan, { foreignKey: 'bookId' });
Student.hasMany(Loan, { foreignKey: 'studentId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });
Loan.belongsTo(Student, { foreignKey: 'studentId' });

exports.Student = Student;
exports.Book = Book;
exports.Loan = Loan;

exports.connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
    await sequelize.sync();
    console.log('Tables are now available');
  } catch (err) {
    console.error(err);
  }
};

async function disconnectDB() {
  await sequelize.close();
}

exports.sequelize = sequelize;
