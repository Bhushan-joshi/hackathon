const Product = require('../Models/product');
const Order = require('../Models/Orders');

exports.getIndex = (req, res, next) => {
    if (req.user.isBuyer) {
        Product.find().then(products => {
            res.render('Buyer/product_list', {
                prods: products,
            });
        })
    } else {
        Product.find({ sellerid: req.user._id }).then(products => {
            res.render('Seller/seller_main', {
                products:products,
            });
        })

    }
}

exports.getDetails = (req, res) => {
    const id = req.params.id;
    Product.findById(id).then(product => {
        res.render('Buyer/product_detail', {
            product: product
        })
    })
}

exports.addToCart = (req, res) => {
    const prodid = req.body._id;
    Product.findById(prodid).then(productid => {
        return req.user.addToCart(productid);
    }).then(result => {
        res.redirect('/app/cart');
    }).catch(err => {
        console.log(err);
    });
}

exports.getCart = (req, res) => {
    let total = 0;
    req.user
        .populate('Cart.items.productid')
        .execPopulate()
        .then(user => {
            const products = user.Cart.items;
            user.Cart.items.forEach(item => {
                total = total + item.quantity * item.productid.Price;
            });
            res.render('Buyer/cart', {
                products: products,
                total: total,
            });
        })
        .catch(err => console.log(err));
}

exports.deleteCartItem = (req, res) => {
    const id = req.body._id;
    req.user.removeCartItem(id).then(result => {
        res.redirect('/app/cart');
    }).catch(err => {
        console.log(err);
    });
}

exports.getOrders = (req, res) => {
    Order.find({ 'userid.id': req.user._id }).then(orders => {
        res.render('Buyer/orders', {
            orders: orders,
        });
    });
}

exports.postOrder = (req, res) => {
    req.user
        .populate('Cart.items.productid')
        .execPopulate()
        .then(user => {
            const items = user.Cart.items.map(itm => {
                return { quantity: itm.quantity, product: { ...itm.productid._doc } };
            });
            const order = new Order({
                userid: {
                    name: req.user.Email,
                    id: req.user
                },
                products: items
            });
            return order.save();
        }).then(result => {
            return req.user.clearCart();
        }).then(() => {
            res.redirect('/app/orders');
        }).catch((err) => {
            console.log(err);
        });
}