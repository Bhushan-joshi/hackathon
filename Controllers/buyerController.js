
exports.getIndex=(req,res,next)=>{
	res.render('Buyer/product_list',{
		prods: '',
	});
}