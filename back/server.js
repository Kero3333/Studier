const express = require("express");

const app = express();

const PORT = 3000 || process.env.PORT;

const login = require("./routes/login");

app.use("/login", login);

app.listen(PORT, () => {
  console.log(`Server listening onn port ${PORT}`);
});
