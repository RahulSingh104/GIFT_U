// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// // GET /api/gifts/filter
// router.get('/filter', async (req, res) => {
//   const { gender, age, occasion, budget } = req.query;

//   try {
//     let query = {};

//     if (gender) query.gender = gender;
//     if (age) query.age = age;
//     if (occasion) query.occasion = occasion;
//     if (budget) query.price = { $lte: parseFloat(budget) };

//     const products = await Product.find(query);
//     res.json(products);
//   } catch (err) {
//     console.error("Filter error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;


const express = require('express');
const Gift = require('../models/gifts');
const router = express.Router();

router.get('/filter', async (req, res) => {
  try {
    const { gender, age, occasion, budget } = req.query;

    let filter = {};

    // Convert to array if not already
    if (gender) {
      filter.gender = { $in: Array.isArray(gender) ? gender : [gender] };
    }
    if (age) {
      filter.age = { $in: Array.isArray(age) ? age : [age] };
    }
    if (occasion) {
      filter.occasion = { $in: Array.isArray(occasion) ? occasion : [occasion] };
    }
    if (budget) {
      filter.price = { $lte: Number(budget) };
    }

    const gifts = await Gift.find(filter);
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gifts', error });
  }
});

module.exports = router;
