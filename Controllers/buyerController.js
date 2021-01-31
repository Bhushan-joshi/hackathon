const Product=require('../Models/product');


exports.getIndex = (req, res, next) => {
	if (req.user.isBuyer) {
		Product.find().then(products=>{
			res.render('Buyer/product_list', {
				prods: products,
			});
		})
	}else{
		res.render('Seller/seller_main', {
			prods: '',
		});
	}
}

exports.getDetails=(req,res)=>{
	const id=req.params.id;
	Product.findById(id).then(product=>{
		res.render('Buyer/product_detail',{
			product:product
		})
	})
}

exports.addToCart=(req,res)=>{
    const prodid = req.body._id;
    Product.findById(prodid).then(productid => {
        return req.user.addToCart(productid);
    }).then(result => {
        res.redirect('/cart');
    }).catch(err => {
        console.log(err);
    });
}

exports.getCart=(req,res)=>{
	res.render('Buyer/cart');
}

exports.getOrders=(req,res)=>{
	res.render('Buyer/orders');
}