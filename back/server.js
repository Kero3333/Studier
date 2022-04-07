const express = require("express");

const app = express();

const PORT = 3000 || process.env.PORT;

const auth = require("./routes/auth");

app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`Server listening onn port ${PORT}`);
});
