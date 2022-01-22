const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
});

exports.Book = sequelize.define('Book', {
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

exports.Student = sequelize.define('Student', {
  studentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

exports.connectToDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  } catch (err) {
    console.error(err);
  }
};

async function disconnectDB() {
  await sequelize.close();
}

exports.sequelize = sequelize;
