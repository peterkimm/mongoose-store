const express = require('express');
const router = express.Router();
const Product = require('../models/products.js');

// SEED
const productSeed = require('../models/productSeed.js');

router.get('/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => { });
    Product.create(productSeed, (error, data) => {
        res.redirect('/products');
    });
});

// ROUTES

// INDEX
router.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

// NEW
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// DELETE
router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect("/products")
    });
});

// UPDATE
router.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updateProduct) => {
            res.redirect(`/products/${req.params.id}`)
        }
    )
});

// BUY UPDATE
// router.put('/:id', (req, res) => {
//     if (req.body.button = true) {
//         product.qty -= 1
//     } else {
//         product.qty
//     }
//     });

// CREATE
router.post('/', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products');
    });
});
// EDIT
router.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct,
        });
    });
});

// SHOW
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});


module.exports = router;