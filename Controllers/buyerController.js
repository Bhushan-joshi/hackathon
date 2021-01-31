
exports.getIndex = (req, res, next) => {
	if (req.user.isBuyer) {
		res.render('Buyer/product_list', {
			prods: '',
		});
	}else{
		res.render('Seller/addProduct', {
			prods: '',
		});
	}

}