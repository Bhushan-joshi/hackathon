const Product = require('../Models/product');

exports.getIndex = (req, res, next) => {
	res.render('Seller/addProduct',{
		Sucess:null
	});
}

exports.addProduct = (req, res, next) => {
	const { title, price, imageUrl, desc } = req.body;
	const product = new Product({
		Title: title,
		Price: price,
		Imageurl: imageUrl,
		Description: desc,
	});
	product.save(savedProduct=>{
		res.render('Seller/addProduct',{
			Sucess:'producted added Sucessfully!',
		})
	})
}