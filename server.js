const app = require('./app')
const mongoose = require("mongoose");

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

// const DB_HOST =
//   "mongodb+srv://YuliiaKar:wfneQ6oL1vmacZ0K@cluster0.j4yjgoy.mongodb.net/db-contacts?retryWrites=true&w=majority";
// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log("Database connection successful"))
//   .catch((error) => console.log(error.message));



  const DB_HOST =
    "mongodb+srv://YuliiaKar:wfneQ6oL1vmacZ0K@cluster0.j4yjgoy.mongodb.net/db-contacts?retryWrites=true&w=majority";
  mongoose
    .connect(DB_HOST)
    .then(() => {
      app.listen(3000)
    })
    .catch(error => {
      console.log(error.message);
      process.exit(1);
});
