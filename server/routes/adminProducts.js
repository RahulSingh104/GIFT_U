// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// // GET all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ message: 'Failed to fetch products' });
//   }
// });

// // ADD a product
// router.post('/', async (req, res) => {
//   const { name, description, price, category, image, extraimage } = req.body;

//   if (!name || !description || !price || !category || !image) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       category,
//       image,
//       extraimage
//     });

//     await newProduct.save();
//     res.status(201).json({ message: 'Product added successfully' });
//   } catch (err) {
//     console.error("Error adding product:", err);
//     res.status(400).json({ message: 'Failed to add product' });
//   }
// });

// // DELETE a product
// router.delete('/:id', async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     console.error("Error deleting product:", err);
//     res.status(500).json({ message: 'Failed to delete product' });
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const newProduct = new Product({
//       ...req.body,
//       addedBy: "admin", // ⬅️ Force it from backend
//     });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });



// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// // GET all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ message: 'Failed to fetch products' });
//   }
// });

// // ADD a product (with addedBy: admin)
// router.post('/', async (req, res) => {
//   const { name, description, price, category, image, extraimage } = req.body;

//   if (!name || !description || !price || !category || !image) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       category,
//       image,
//       extraimage,
//       addedBy: "admin", // ✅ Important!
//     });

//     await newProduct.save();
//     res.status(201).json({ message: 'Product added successfully' });
//   } catch (err) {
//     console.error("Error adding product:", err);
//     res.status(400).json({ message: 'Failed to add product' });
//   }
// });

// // DELETE a product
// router.delete('/:id', async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     console.error("Error deleting product:", err);
//     res.status(500).json({ message: 'Failed to delete product' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// // ✅ GET all products (including admin-added)
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     console.error("❌ Error fetching products:", err);
//     res.status(500).json({ message: 'Failed to fetch products' });
//   }
// });

// // ✅ ADD new product (default addedBy = admin)
// router.post('/', async (req, res) => {
//   try {
//     const productData = {
//       ...req.body,
//       addedBy: "admin" // In future: get this from req.user if using auth
//     };

//     const newProduct = new Product(productData);
//     await newProduct.save();

//     res.status(201).json(newProduct);
//   } catch (err) {
//     console.error("❌ Error adding product:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ✅ GET all products (including admin-added)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// ✅ ADD new product (default addedBy = admin)
router.post('/', async (req, res) => {
  try {
    const productData = {
      ...req.body,
      addedBy: "admin"
    };

    const newProduct = new Product(productData);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ NEW: GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("❌ Error fetching product by ID:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
