const express = require("express")
const router = express.Router()
const request = require('request')

router.get('/products', function (req, res, next) {
    const searchTerm = req.query.search_term; // Extract search term from query parameters

    // Base SQL query to get all products
    let sqlquery = "SELECT * FROM products";

    // Modify SQL query if a search term is provided
    if (searchTerm) {
        sqlquery += " WHERE name LIKE ?";
    }

    // Execute the SQL query
    db.query(sqlquery, searchTerm ? [`%${searchTerm}%`] : [], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Database query failed' });
            return next(err);
        }
        
        // Convert results to HTML list
        let html = '<link rel="stylesheet" href="/main.css">\n';
        html += '<ul class="products-list">';
        result.forEach(product => {
            html += `<li>${product.model} - £${product.price} - ${product.type_of_device}</li>`;
        });
        html += '</ul>';
        
        // Set content type to HTML and send response
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    });
});

module.exports = router;