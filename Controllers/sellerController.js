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
		by:req.user.firstName + " "+ req.user.lastName,
		sellerid:req.user,
	});
	product.save().then(savedProduct=>{
		res.render('Seller/addProduct',{
			Sucess:'producted added Sucessfully!',
		})
	})
}

exports.deleteProduct=(req,res)=>{
	const id=req.body._id
	Product.deleteOne({_id:id}).then(deleted=>{
		res.redirect('/app')
	})
}