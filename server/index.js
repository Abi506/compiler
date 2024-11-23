const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const compileRoutes = require("./routes/compileRoute");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/compile", compileRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
