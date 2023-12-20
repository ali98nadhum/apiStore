const express = require("express");
const app = express();
const port = 3000;
const Products = require("./routers/Dashboard");
const clinetApp = require("./routers/clinetApp");
const client = require("./db/index");

app.use(express.json());

// dashboard path
app.use("/api/v1/Products", Products);
app.use("/api/v1/Products", Products);
app.use("/api/v1/Products", Products);
app.use("/api/v1/Products", Products);
app.use("/api/v1/admin", Products);
app.use("/api/v1/admin", Products);

// client path
app.use("/api/v1/products", clinetApp);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
