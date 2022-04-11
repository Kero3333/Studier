const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.json());

const auth = require("./routes/auth");
const covoiturage = require("./routes/covoiturage");

app.use(cors());

app.use("/auth", auth);

app.use("/covoiturage", covoiturage);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
