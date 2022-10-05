import app from "./index.js";
import { connect } from "./config/db.js";

connect();

app.get("/", (req, res, next) => {
  res.send("<h1>Working<h1/>");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running sucessfully on PORT: ${process.env.PORT}`)
);
