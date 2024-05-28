// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product.model");
// const { isAuthenticated } = require("../middleware/jwt.middleware");
// //const roleValidation = require('../pointofsale/middleware/roleValidation');
// const roleValidation = require("../middleware/roleValidation");




// // Get all products (accessible to all users)
// // 🥕 This one's easy, you can test it right away! 
// router.get("/", (req, res) => {
//   Product.find()
//     .then(products => res.json(products))
//     .catch(err => res.status(500).json({
// 	    message: "Internal Server Error", err 
// 	 }));
// });

// // Create a new product (only admin)
// // ⛔️ you can only run this route if you actually logged in with admin!
// router.post("/", isAuthenticated, roleValidation(["admin"]), (req, res) => {
//   const { name, price, description, inStock } = req.body;
//   if (!name || !price) {
//     return res.status(400).json({ message: "Name and price are required" });
//   }
//   Product.create({ name, price, description, inStock })
//     .then(newProduct => res.status(201).json(newProduct))
// 		    .catch(err => res.status(500).json({ 
// 			    message: "Internal Server Error", err 
//     }));
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const roleValidation = require("../middleware/roleValidation");

// Get all products (accessible to all users)
router.get("/", (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    }));
});

// Create a new product (only admin)
router.post("/", isAuthenticated, roleValidation(["admin"]), (req, res) => {
  const { name, price, description, inStock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  Product.create({ name, price, description, inStock })
    .then(newProduct => res.status(201).json(newProduct))
    .catch(err => res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    }));
});

module.exports = router;
