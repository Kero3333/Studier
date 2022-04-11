const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.json());

const auth = require("./routes/auth");
<<<<<<< HEAD
const announce = require("./routes/announce");
=======
const covoiturage = require("./routes/covoiturage");
>>>>>>> 13905c5c0b0a367c4e0737cd84952e8052a565df

app.use(cors());

app.use("/auth", auth);
app.use("/announce", announce);

app.use("/covoiturage", covoiturage);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
