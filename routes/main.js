// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')
// Handle our routes
router.get('/',function(req, res, next){
    res.render('login.ejs')
})


router.get('/about',function(req, res, next){
    res.render('about.ejs')
})

router.get('/products', function(req, res, next) {
    res.render('product.ejs');
});

router.get('/find_products', function (req, res, next) {
    const apiKey = '22843cc1-2f15-4b27-9e23-e8731c15a803';
    const apiId = '677427b7a9199c5c82a8ebae'; 
    const product = req.query.product;

    const options = {
        url: `https://api.techspecs.io/v5/products/search?query=${product}`,
        headers: {
            'X-API-KEY': apiKey,
            'X-API-ID': apiId
        }
    };

    request(options, function (err, response, body) {
        if (err) {
            return next(err);
        }
        try {
            const JsonData = JSON.parse(body); // Parse the API response
            const products = JsonData.data.map(item => {
                return {
                  id: item.Product.id,
                  brand: item.Product.Brand,
                  category: item.Product.Category,
                  model: item.Product.Model,
                  version: item.Product.Version
                };
              });              
            let html = '<link rel="stylesheet" href="/main.css">\n';
            html += '<ul class="products-list">';
            products.forEach(product => {
                html += `<li>${product.brand} - ${product.category} - ${product.model}</li>`;
            });
            html += '</ul>';
            
            // Set content type to HTML and send response
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        
        } catch (parseError) {
            next(parseError); 
        }
    });    
});

// Export the router object so index.js can access it
module.exports = router