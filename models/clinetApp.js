const client = require("../db/index");



// for get all Products
async function getProducts(req, res) {
    const result = await client.query(`SELECT * FROM Products`);
    res.send(result.rows);
  }





  module.exports = {
    getProducts,
  }