const app = require('./app');
const { connectToDB } = require('./database');

const PORT = process.env.PORT || 3000;

async function main() {
  await connectToDB();

  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server started on port: ${PORT}`);
    }
  });
}

main();
