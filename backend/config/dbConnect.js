const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`DB is Connected`))
  .catch((err) => console.log(`DB is Not Connected`));
