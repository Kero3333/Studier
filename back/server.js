const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.json());

const auth = require("./routes/auth");

app.use(cors());

app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`Server listening onn port ${PORT}`);
});
