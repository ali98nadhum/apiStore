const client = require("../db/index");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// for get all Products
async function getProducts(req, res) {
  const result = await client.query(`SELECT * FROM Products`);
  res.send(result.rows);
}

// for add Products
async function addProducts(req, res) {
  let { name, price, discount, image, active } = req.body;
  const result =
    await client.query(`INSERT INTO Products (name, price , discount , image , active)
    VALUES ('${name}', ${price} , ${discount} , '${image}' , ${active} ) RETURNING *`);
  res.send(result.rows);
}

// for update Products
async function updateProducts(req, res) {
  let id = req.params.id;
  let { name, price, discount, image, active } = req.body;
  const result = await client.query(
    `UPDATE Products SET name = '${name}' , 
    price = ${price}, 
    discount= ${discount} , 
    image= '${image}' , 
    active= ${active}  WHERE id = ${id} RETURNING *`
  );
  res.send(result.rows);
}

// for delete products
async function deleteProduct(req, res) {
  let id = req.params.id;
  const result = await client.query(`DELETE FROM Products
  WHERE id = ${id}
  RETURNING *`);
  res.send(result.rows);
}

// register admins
async function registerAdmin(req, res) {
  let { name, department, username, password } = req.body;
  const hashPasswod = bcrypt.hashSync(password, 10);
  const result =
    await client.query(`INSERT INTO admins (name, department , username , password)
  VALUES ('${name}', '${department}' , '${username}' , '${hashPasswod}' ) RETURNING *`);
  res.send(result.rows);
}

// login admin
async function loginAdmin(req, res) {
  let { username, password } = req.body;
  const result = await client.query(
    `SELECT * FROM admins WHERE username = '${username}'`
  );

  if (result.rows.length === 0)
    res.send({ success: false, msg: "User not found" });
  else {
    let user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      var token = jwt.sign(user, "shhhhh");
      res.send({ success: true, token, user });
    } else res.send({ success: false, msg: "Wrong password or username!" });
  }
}

module.exports = {
  getProducts,
  addProducts,
  updateProducts,
  deleteProduct,
  registerAdmin,
  loginAdmin,
};
